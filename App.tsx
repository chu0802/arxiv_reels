"use client";

import React, { useEffect, useRef, useState, useMemo, useLayoutEffect } from 'react';
import { fetchRecommendationsClient } from './services/recommendationsClient';
import { ratePaperClient } from './services/ratingClient';
import { fetchCollectionsClient, fetchCollectionPapersClient } from './services/collectionsClient';
import PaperCard from './components/PaperCard';
import { PaperData } from './types';
import { Collection } from './types';

function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activePaperIndex, setActivePaperIndex] = useState(0);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Loading recommendations…');
  const [loadError, setLoadError] = useState<string | null>(null);
  
  // Initialize filter from URL if present
  const [activeFilter, setActiveFilter] = useState(() => {
    if (typeof window === 'undefined') return 'For You';
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('filter') || 'For You';
    } catch (e) {
      return 'For You';
    }
  });

  const [hasRestoredState, setHasRestoredState] = useState(false);
  const lastFetchRef = useRef<string | null>(null);

  // Papers state; start empty to avoid showing default data while loading
  const [allPapersData, setAllPapersData] = useState<PaperData[]>([]);
  const [allCollectionNamesFromServer, setAllCollectionNamesFromServer] = useState<string[]>([]);
  const [collectionIdMap, setCollectionIdMap] = useState<Record<string, string>>({});

  const fetchRecommendations = React.useCallback(async () => {
    setLoadError(null);
    setLoadingMessage('Loading recommendations…');
    setLoading(true);
    try {
      const res = await fetchRecommendationsClient<PaperData>();
      const order = Array.isArray(res.order) && res.order.length > 0 ? res.order : Object.keys(res.digest_df ?? {});
      const list = order.map((key) => res.digest_df?.[key]).filter(Boolean) as PaperData[];
      if (list.length > 0) {
        setAllPapersData(list);
        setActivePaperIndex(0);
      } else {
        setLoadError('No recommendations returned.');
      }
    } catch (err) {
      console.error('Failed to load recommendations', err);
      setLoadError('Failed to load recommendations.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCollectionPapers = React.useCallback(async (collectionId: string) => {
    setLoadError(null);
    setLoadingMessage('Loading collection…');
    setLoading(true);
    try {
      const res = await fetchCollectionPapersClient<PaperData>(collectionId);
      const order = Array.isArray(res.order) && res.order.length > 0 ? res.order : Object.keys(res.digest_df ?? {});
      const list = order.map((key) => res.digest_df?.[key]).filter(Boolean) as PaperData[];
      if (list.length > 0) {
        setAllPapersData(list);
        setActivePaperIndex(0);
      } else {
        setLoadError('No papers in this collection.');
      }
    } catch (err) {
      console.error('Failed to load collection papers', err);
      setLoadError('Failed to load collection papers.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRate = async (paperId: number, newRating: number) => {
    let previousRating = 0;
    let previousLikes = 0;
    setAllPapersData((prev) =>
      prev.map((p) => {
        if (p.paper_id !== paperId) return p;
        previousRating = p.rating ?? 0;
        previousLikes = p.total_likes ?? 0;
        let nextLikes = p.total_likes;
        if (previousRating !== 1 && newRating === 1) nextLikes += 1;
        if (previousRating === 1 && newRating !== 1) nextLikes = Math.max(0, nextLikes - 1);
        return { ...p, rating: newRating, total_likes: nextLikes };
      })
    );

    try {
      await ratePaperClient(paperId, newRating);
    } catch (error) {
      console.error('Failed to rate paper', error);
      // Revert on failure
      setAllPapersData((prev) =>
        prev.map((p) => (p.paper_id === paperId ? { ...p, rating: previousRating, total_likes: previousLikes } : p))
      );
    }
  };

  // Load data based on active filter (supports reload on collection tab)
  useEffect(() => {
    const isCollectionFilter = activeFilter !== 'For You' && activeFilter !== 'Trending';

    if (isCollectionFilter) {
      const collectionId = collectionIdMap[activeFilter];
      if (!collectionId) return; // wait until mapping is available

      const key = `collection:${collectionId}`;
      if (lastFetchRef.current === key) return;

      lastFetchRef.current = key;
      fetchCollectionPapers(collectionId);
      return;
    }

    if (lastFetchRef.current === 'recommendations') return;
    lastFetchRef.current = 'recommendations';
    fetchRecommendations();
  }, [activeFilter, collectionIdMap, fetchCollectionPapers, fetchRecommendations]);

  // Fetch collections list from server
  useEffect(() => {
    (async () => {
      const res = await fetchCollectionsClient();
      if (res.success && Array.isArray(res.collections)) {
        setAllCollectionNamesFromServer(res.collections);
        setCollectionIdMap(res.mapping || {});
      }
    })();
  }, []);

  // Extract colors from papers for known collections (fallback if API has names but no colors)
  const collectionColors = useMemo(() => {
    const colors: Record<string, string> = {};
    allPapersData.forEach(paper => {
      paper.collections.forEach(c => {
        colors[c.name] = c.color;
      });
    });
    return colors;
  }, [allPapersData]);

  // Combine server names with colors (fallback color if missing)
  const allCollections = useMemo<Collection[]>(() => {
    const names = allCollectionNamesFromServer.length > 0
      ? allCollectionNamesFromServer
      : Object.keys(collectionColors);

    const uniqueNames = Array.from(new Set(names)).sort();
    return uniqueNames.map(name => ({ name, color: collectionColors[name] || '#cbd5e1' }));
  }, [allCollectionNamesFromServer, collectionColors]);

  // Get sorted list of names
  const allCollectionNames = useMemo(() => {
    return allCollections.map(c => c.name);
  }, [allCollections]);

  // Filter papers based on active selection
  const papers = useMemo(() => {
    if (activeFilter === 'For You' || activeFilter === 'Trending') {
      return allPapersData;
    }
    return allPapersData.filter(p => p.collections.some(c => c.name === activeFilter));
  }, [activeFilter, allPapersData]);

  // Scroll Restoration Logic: Run once when papers are ready
  useLayoutEffect(() => {
    if (hasRestoredState) return;

    try {
        // Prevent browser's native scroll restoration
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    } catch (e) {
        console.warn('Scroll restoration not supported in this environment');
    }

    try {
        const params = new URLSearchParams(window.location.search);
        const paperId = params.get('paper');

        if (paperId && scrollContainerRef.current && papers.length > 0) {
            const index = papers.findIndex(p => p.paper_id.toString() === paperId);
            if (index >= 0) {
                setActivePaperIndex(index);
                // Immediate scroll to position
                scrollContainerRef.current.scrollTop = index * scrollContainerRef.current.clientHeight;
            }
        }
    } catch (e) {
        console.warn('Error reading URL parameters:', e);
    }
    setHasRestoredState(true);
  }, [papers]);

  // Scroll to top when filter changes (only after initial load)
  useEffect(() => {
    if (hasRestoredState && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeFilter]);

  // Intersection Observer to track which paper is currently in view and update URL
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActivePaperIndex(index);

            // Update URL query parameters without reloading
            const paper = papers[index];
            if (paper) {
                try {
                    // Check for blob protocol to avoid SecurityError in some preview environments
                    if (window.location.protocol === 'blob:') return;

                    const newUrl = new URL(window.location.href);
                    newUrl.searchParams.set('paper', paper.paper_id.toString());
                    newUrl.searchParams.set('filter', activeFilter);
                    window.history.replaceState(null, '', newUrl.toString());
                } catch (e) {
                    // Silently fail if history API is restricted
                }
            }
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.5, 
      }
    );

    const cards = document.querySelectorAll('.paper-card-wrapper');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [papers, activeFilter]);

  // Track which papers have been preloaded to avoid redundant requests
  const preloadedPapersRef = useRef<Set<number>>(new Set());

  // Initial preload: load first N papers when data arrives
  const INITIAL_PRELOAD_COUNT = 3;
  
  useEffect(() => {
    if (papers.length === 0) return;

    const preloadImage = (url: string) => {
      const img = new Image();
      img.src = url;
    };

    const getMainImageUrl = (paper: PaperData) => 
      `https://paper-assets.alphaxiv.org/image/${paper.arxiv_id}v1.png`;

    const getTeaserUrl = (imageUrl: string) => 
      `https://www.scholar-inbox.com${imageUrl}`;

    const preloadPaper = (paper: PaperData) => {
      if (preloadedPapersRef.current.has(paper.paper_id)) return;
      preloadedPapersRef.current.add(paper.paper_id);

      // Preload main figure
      preloadImage(getMainImageUrl(paper));

      // Preload all teaser figures
      if (paper.teaser_figures) {
        paper.teaser_figures.forEach(teaser => {
          preloadImage(getTeaserUrl(teaser.imageUrl));
        });
      }
    };

    // Initial load: preload first N papers
    for (let i = 0; i < Math.min(INITIAL_PRELOAD_COUNT, papers.length); i++) {
      preloadPaper(papers[i]);
    }
  }, [papers]);

  // Preload neighbors when active paper changes
  useEffect(() => {
    if (papers.length === 0) return;

    const preloadImage = (url: string) => {
      const img = new Image();
      img.src = url;
    };

    const getMainImageUrl = (paper: PaperData) => 
      `https://paper-assets.alphaxiv.org/image/${paper.arxiv_id}v1.png`;

    const getTeaserUrl = (imageUrl: string) => 
      `https://www.scholar-inbox.com${imageUrl}`;

    const preloadPaper = (paper: PaperData) => {
      if (preloadedPapersRef.current.has(paper.paper_id)) return;
      preloadedPapersRef.current.add(paper.paper_id);

      // Preload main figure
      preloadImage(getMainImageUrl(paper));

      // Preload all teaser figures
      if (paper.teaser_figures) {
        paper.teaser_figures.forEach(teaser => {
          preloadImage(getTeaserUrl(teaser.imageUrl));
        });
      }
    };

    // Preload current and neighbors (previous, next)
    const indicesToPreload = [
      activePaperIndex,
      activePaperIndex - 1,
      activePaperIndex + 1
    ].filter(i => i >= 0 && i < papers.length);

    indicesToPreload.forEach(index => {
      const paper = papers[index];
      if (paper) {
        preloadPaper(paper);
      }
    });
  }, [activePaperIndex, papers]);

  // Reset preload cache when papers list changes (e.g., filter change)
  useEffect(() => {
    preloadedPapersRef.current.clear();
  }, [activeFilter]);
  if (loading) {
    return (
      <div className="bg-white text-slate-900 h-[100dvh] w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <div className="h-10 w-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin" aria-label="Loading" />
          <div className="text-sm font-medium">{loadingMessage}</div>
        </div>
      </div>
    );
  }

  if (!loading && loadError) {
    return (
      <div className="bg-white text-slate-900 h-[100dvh] w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-500 text-center px-6">
          <div className="h-10 w-10 border-4 border-slate-200 border-t-red-400 rounded-full animate-spin" aria-label="Error" />
          <div className="text-sm font-medium">{loadError}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-slate-900 h-[100dvh] w-full flex flex-col overflow-hidden font-sans">
        {/* Navigation / Filter Bar - Softer Look with Collection Colors */}
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center py-4 px-4 bg-white/80 backdrop-blur-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] gap-2">
          <div className="shrink-0 flex items-center gap-2">
            <button 
              onClick={() => {
                setActiveFilter('For You');
              }}
              className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeFilter === 'For You' || activeFilter === 'Trending'
                  ? 'bg-slate-900 text-white shadow-md scale-105' 
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              For You
            </button>
            <div className="w-px h-5 bg-slate-200 shrink-0 rounded-full" />
          </div>

          <div className="flex-1 overflow-x-auto no-scrollbar mask-linear-fade flex items-center gap-2">
            {allCollectionNames.map(name => {
              const color = collectionColors[name];
              const isActive = activeFilter === name;
              const collectionId = collectionIdMap[name];
              
              return (
                <button 
                  key={name}
                  onClick={() => {
                    setActiveFilter(name);
                  }}
                  className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                    isActive 
                      ? 'text-slate-900 shadow-md scale-105 ring-1 ring-black/5' 
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                  style={isActive ? { backgroundColor: color } : {}}
                >
                  {/* Visual indicator for color when not active, optional but nice */}
                  {!isActive && (
                      <span className="w-2 h-2 rounded-full opacity-50" style={{ backgroundColor: color }} />
                  )}
                  {name}
                </button>
              );
            })}
            {/* Spacer for right padding in scroll */}
            <div className="w-4 shrink-0" />
          </div>
        </div>

      {/* Main Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className={`w-full h-full ${isDetailDrawerOpen ? 'overflow-hidden' : 'overflow-y-scroll'} snap-y snap-mandatory no-scrollbar relative overscroll-none`}
      >
        {/* Papers List */}
        {papers.map((paper, index) => {
          return (
            <div 
              key={paper.paper_id} 
              data-index={index}
              className="paper-card-wrapper w-full h-full snap-start snap-always"
            >
              <PaperCard 
                paper={paper} 
                isActive={index === activePaperIndex} 
                availableCollections={allCollections}
                collectionIdMap={collectionIdMap}
                onRate={handleRate}
                onDetailOpenChange={setIsDetailDrawerOpen}
              />
            </div>
          );
        })}
        
        {/* Empty State */}
        {papers.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4 p-8 text-center bg-gradient-to-b from-white to-slate-50">
                <div className="p-6 bg-white shadow-xl shadow-slate-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                </div>
                <div>
                    <p className="font-bold text-slate-700 text-lg">No papers found</p>
                    <p className="text-sm text-slate-400 mt-1">There are no papers in the "{activeFilter}" collection.</p>
                </div>
                <button 
                  onClick={() => setActiveFilter('For You')}
                  className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold text-sm shadow-xl hover:bg-slate-800 transition-all hover:scale-105 mt-4"
                >
                  Back to Home
                </button>
            </div>
        )}
      </div>
    </div>
  );
}

export default App;