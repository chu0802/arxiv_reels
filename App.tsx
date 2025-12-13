import React, { useEffect, useRef, useState, useMemo, useLayoutEffect } from 'react';
import { PAPERS_DATA } from './constants';
import PaperCard from './components/PaperCard';
import { PaperData } from './types';

function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activePaperIndex, setActivePaperIndex] = useState(0);
  
  // Initialize filter from URL if present
  const [activeFilter, setActiveFilter] = useState(() => {
    try {
        const params = new URLSearchParams(window.location.search);
        return params.get('filter') || 'For You';
    } catch (e) {
        return 'For You';
    }
  });

  const [hasRestoredState, setHasRestoredState] = useState(false);

  // Convert map to array for processing
  const allPapersData = useMemo(() => Object.values(PAPERS_DATA), []);

  // Extract all unique collections and their colors
  const collectionColors = useMemo(() => {
    const colors: Record<string, string> = {};
    allPapersData.forEach(paper => {
      paper.collections.forEach(c => {
        colors[c.name] = c.color;
      });
    });
    return colors;
  }, [allPapersData]);

  // Get sorted list of names
  const allCollectionNames = useMemo(() => {
    return Object.keys(collectionColors).sort();
  }, [collectionColors]);

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

  return (
    <div className="bg-white text-slate-900 h-[100dvh] w-full flex flex-col overflow-hidden font-sans">
        {/* Navigation / Filter Bar - Softer Look with Collection Colors */}
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center py-4 px-4 bg-white/80 backdrop-blur-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] gap-2 overflow-x-auto no-scrollbar mask-linear-fade">
          
          <button 
            onClick={() => setActiveFilter('For You')}
            className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
              activeFilter === 'For You' || activeFilter === 'Trending'
                ? 'bg-slate-900 text-white shadow-md scale-105' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            For You
          </button>

          <div className="w-px h-5 bg-slate-200 mx-2 shrink-0 rounded-full" />

          {allCollectionNames.map(name => {
            const color = collectionColors[name];
            const isActive = activeFilter === name;
            
            return (
              <button 
                key={name}
                onClick={() => setActiveFilter(name)}
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

      {/* Main Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar relative"
      >
        {/* Papers List */}
        {papers.map((paper, index) => {
          // Preload Logic:
          // 1. Priority (Images): Eagerly load full images for immediate neighbors (+/- 2)
          // 2. Attributes (Metadata): Pre-calculate derived state (like teaser availability/layout) for a wider range (+/- 5)
          const distance = Math.abs(index - activePaperIndex);
          const isPriority = distance <= 2;
          const isPreloadAttributes = distance <= 5;
          
          return (
            <div 
              key={paper.paper_id} 
              data-index={index}
              className="paper-card-wrapper w-full h-full snap-start snap-always"
            >
              <PaperCard 
                paper={paper} 
                isActive={index === activePaperIndex} 
                priority={isPriority}
                preloadAttributes={isPreloadAttributes}
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