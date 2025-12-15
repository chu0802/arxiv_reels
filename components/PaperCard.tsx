import React, { useState, useRef, useEffect } from 'react';
import { PaperData, Collection } from '../types';
import DetailDrawer from './DetailDrawer';
import CollectionDrawer from './CollectionDrawer';

interface PaperCardProps {
  paper: PaperData;
  isActive: boolean;
  priority?: boolean; // Controls eager loading for main images (heavy assets)
  preloadAttributes?: boolean; // Controls checking of metadata/structure (e.g. teaser availability)
  availableCollections: Collection[];
  collectionIdMap?: Record<string, string>;
  onRate?: (paperId: number, rating: number) => void | Promise<void>;
  onDetailOpenChange?: (isOpen: boolean) => void;
}

const PaperCard: React.FC<PaperCardProps> = ({ 
    paper, 
    isActive, 
    priority = false,
    preloadAttributes = false,
  availableCollections,
  collectionIdMap,
    onRate,
    onDetailOpenChange
}) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);
  const [mainImageError, setMainImageError] = useState(false);
  
  // Full Screen Teaser States
  const [showFullScreenTeaser, setShowFullScreenTeaser] = useState(false);
  const [isClosingTeaser, setIsClosingTeaser] = useState(false);
  const [isTeaserPortrait, setIsTeaserPortrait] = useState(false);

  const [collections, setCollections] = useState(paper.collections);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasTeaser, setHasTeaser] = useState<boolean | null>(null); // null = loading, true/false
  const [detailDragProgress, setDetailDragProgress] = useState(0); // 0 = closed, 1 = fully open
  const [isDetailTransitioning, setIsDetailTransitioning] = useState(false); // Track if drawer is animating
  
  // Ref to handle click debounce
  const clickTimeoutRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const previousRatingRef = useRef(paper.rating);
  const likeAnimationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Construct URLs
  const mainImageUrl = `https://paper-assets.alphaxiv.org/image/${paper.arxiv_id}v1.png`;
  const teaserImageUrl = `https://www.scholar-inbox.com/teaser_figures/${paper.paper_id}.0.jpeg`;

  // Preload/Check teaser image existence and dimensions (Metadata/Attribute Check)
  useEffect(() => {
    // Optimization: Check for teaser if we should preload attributes (wider range) OR if priority is high.
    // This allows us to determine the card layout (hasTeaser?) before the user fully arrives.
    if (!preloadAttributes && !priority) return;
    if (hasTeaser !== null) return; // Already checked

    const img = new Image();
    img.src = teaserImageUrl;
    img.onload = () => {
        setHasTeaser(true);
        // Determine if portrait (height > width)
        setIsTeaserPortrait(img.naturalHeight > img.naturalWidth);
    };
    img.onerror = () => setHasTeaser(false);
  }, [teaserImageUrl, priority, preloadAttributes, hasTeaser]);

  const openTeaser = () => {
    setIsClosingTeaser(false);
    setShowFullScreenTeaser(true);
  };

  const closeTeaser = () => {
    setIsClosingTeaser(true);
    setTimeout(() => {
        setShowFullScreenTeaser(false);
        setIsClosingTeaser(false);
    }, 500); // Match animation duration
  };

  const liked = (paper.rating ?? 0) > 0;
  const disliked = (paper.rating ?? 0) < 0;

  useEffect(() => {
    if (paper.rating > 0 && (previousRatingRef.current ?? 0) <= 0) {
      setShowLikeAnimation(true);
      if (likeAnimationTimeoutRef.current) clearTimeout(likeAnimationTimeoutRef.current);
      likeAnimationTimeoutRef.current = setTimeout(() => setShowLikeAnimation(false), 800);
    }
    previousRatingRef.current = paper.rating;

    return () => {
      if (likeAnimationTimeoutRef.current) clearTimeout(likeAnimationTimeoutRef.current);
    };
  }, [paper.rating]);

  const toggleLike = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      const nextRating = liked ? 0 : 1;
      if (nextRating > 0) {
        setShowLikeAnimation(true);
        if (likeAnimationTimeoutRef.current) clearTimeout(likeAnimationTimeoutRef.current);
        likeAnimationTimeoutRef.current = setTimeout(() => setShowLikeAnimation(false), 800);
      }
      onRate?.(paper.paper_id, nextRating);
  };

  const toggleDislike = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      const nextRating = disliked ? 0 : -1;
      onRate?.(paper.paper_id, nextRating);
  };

  const handleInteraction = (e: React.MouseEvent) => {
    e.preventDefault();
    if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = null;
        toggleLike();
    } else {
        clickTimeoutRef.current = setTimeout(() => {
            clickTimeoutRef.current = null;
            // If on the teaser slide (index 1), open full screen view
            if (currentImageIndex === 1) {
                openTeaser();
            } else {
                setIsDetailOpen(true);
            }
        }, 250);
    }
  };

  const handleScroll = () => {
      if (scrollRef.current) {
          const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.offsetWidth);
          setCurrentImageIndex(index);
      }
  };

  // Determine animation classes based on orientation
  const getTeaserAnimation = () => {
    if (isClosingTeaser) {
        return isTeaserPortrait ? 'animate-zoom-out' : 'animate-zoom-rotate-out';
    }
    return isTeaserPortrait ? 'animate-zoom-in' : 'animate-zoom-rotate-in';
  };

  // Notify parent to lock/unlock underlying scroll when detail drawer toggles
  useEffect(() => {
    onDetailOpenChange?.(isDetailOpen);
  }, [isDetailOpen, onDetailOpenChange]);

  // Ensure scroll is unlocked if this card unmounts while detail is open
  useEffect(() => () => {
    onDetailOpenChange?.(false);
  }, [onDetailOpenChange]);

  // Calculate blur based on detail drawer state
  // detailDragProgress: 1 = drawer fully open (papercard blurred)
  //                     0 = drawer closing/closed (papercard clear)
  // This is the inverse of DetailDrawer's blur
  const [isDraggingDrawer, setIsDraggingDrawer] = useState(false);
  const blurAmount = detailDragProgress * 8; // Max 8px blur when drawer fully open
  
  const getBlurStyle = (): React.CSSProperties => {
    // Only apply blur when drawer is open or transitioning
    if (!isDetailOpen && !isDetailTransitioning) {
      return {};
    }
    return {
      filter: `blur(${blurAmount}px)`,
      transition: isDraggingDrawer ? 'none' : 'filter 0.35s cubic-bezier(0.32, 0.72, 0, 1)'
    };
  };

  // Handle drag progress from DetailDrawer
  const handleDragProgress = (progress: number, dragging: boolean) => {
    setDetailDragProgress(progress);
    setIsDraggingDrawer(dragging);
    
    // Track transitioning state for blur animation
    if (isDetailOpen || progress > 0) {
      setIsDetailTransitioning(true);
    }
    
    // When fully closed (progress = 0 and not dragging), end transition after animation
    if (progress === 0 && !dragging) {
      setTimeout(() => {
        if (!isDetailOpen) {
          setIsDetailTransitioning(false);
        }
      }, 350);
    }
  };

  return (
    <>
    <div 
      className="relative w-full h-full snap-start shrink-0 overflow-hidden text-slate-900 bg-white select-none cursor-pointer group"
      style={getBlurStyle()}
      onClick={handleInteraction}
    >
      {/* Horizontal Carousel Container */}
      {/* Disable scrolling if no teaser */}
      <div 
        ref={scrollRef}
        className={`absolute inset-0 z-0 flex ${hasTeaser ? 'overflow-x-auto snap-x snap-mandatory' : 'overflow-hidden'} no-scrollbar`}
        onScroll={handleScroll}
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Slide 1: Main Image */}
        <div className="relative w-full h-full shrink-0 snap-center overflow-hidden">
             {/* Background Blur Layer */}
              <div 
                  className={`absolute inset-0 z-0 ${mainImageError ? 'bg-slate-100' : ''}`}
                  style={
                    mainImageError
                      ? undefined
                      : {
                          backgroundImage: `url(${mainImageUrl})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          filter: 'blur(90px) opacity(0.25) saturate(1.8)',
                          transform: 'scale(1.2)' 
                        }
                  }
              />
            {/* Main Image Layer */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pt-12 pb-8 px-6">
              <div className="w-full h-full max-w-[440px] mx-auto flex items-center justify-center drop-shadow-2xl -translate-y-4">
                {mainImageError ? (
                  <div className="w-full h-full flex flex-col items-center justify-start bg-slate-50 text-slate-600 border border-slate-200 rounded-sm px-4 pt-6 text-center gap-3">
                    <div className="w-[90%] text-sm font-semibold text-slate-800 line-clamp-2 mt-12 mb-2">{paper.title}</div>
                    <div className="w-[90%] text-xs text-slate-500 line-clamp-2 mb-4">{paper.authors}</div>
                    <div className="w-[90%] flex flex-col items-center gap-2 mx-auto">
                      {hasTeaser === false ? (
                        <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Teaser unavailable</div>
                      ) : (
                        <img
                          src={teaserImageUrl}
                          alt="Teaser Figure"
                          className="w-full max-w-full h-auto max-h-48 object-contain rounded-sm shadow-sm"
                          loading="lazy"
                          draggable={false}
                          onLoad={() => setHasTeaser(true)}
                          onError={() => setHasTeaser(false)}
                        />
                      )}
                    </div>
                    {paper.abstract && (
                      <div className="w-[90%] text-[11px] text-slate-500 leading-snug line-clamp-4 mx-auto">{paper.abstract}</div>
                    )}
                  </div>
                ) : (
          <img 
            src={mainImageUrl} 
            alt={paper.title}
            className="w-full h-full max-w-[720px] object-contain drop-shadow-2xl rounded-sm transition-transform duration-500 ease-out"
            loading={priority ? "eager" : "lazy"}
            // @ts-ignore - React 19 supports fetchPriority
            fetchPriority={isActive ? "high" : "auto"}
            draggable={false}
            onError={() => setMainImageError(true)}
          />
                )}
              </div>
            </div>
        </div>

        {/* Slide 2: Teaser Figure - Only render if confirmed exists */}
        {hasTeaser && (
            <div className="relative w-full h-full shrink-0 snap-center overflow-hidden bg-white">
                 {/* Teaser Background Blur */}
                 <div 
                    className="absolute inset-0 z-0"
                    style={{
                    backgroundImage: `url(${teaserImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(90px) opacity(0.15) saturate(1.5)',
                    transform: 'scale(1.2)' 
                    }}
                />
                 <div className="absolute inset-0 z-10 flex items-center justify-center pt-12 pb-8 px-2 -translate-y-3">
                    <img 
                        src={teaserImageUrl} 
                        alt="Teaser Figure"
                        className="w-full h-full object-contain drop-shadow-xl rounded-sm"
                        loading={priority ? "eager" : "lazy"}
                        draggable={false}
                    />
                </div>
                {/* Helper Text for Interaction */}
                <div className="absolute bottom-24 left-0 right-0 text-center z-20 opacity-60">
                    <span className="text-[10px] font-bold text-slate-500 bg-white/50 backdrop-blur-sm px-2 py-1 rounded-full uppercase tracking-widest">
                        {isTeaserPortrait ? 'Tap to Expand' : 'Tap to Rotate & Expand'}
                    </span>
                </div>
            </div>
        )}
      </div>

      {/* Pagination Dots - Only show if has teaser */}
      {hasTeaser && (
          <div className="absolute bottom-2 left-0 right-0 z-30 flex justify-center gap-2 pointer-events-none pb-1">
            <div 
                className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${currentImageIndex === 0 ? 'bg-slate-800 w-4' : 'bg-slate-300 w-1.5'}`}
            />
            <div 
                className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${currentImageIndex === 1 ? 'bg-slate-800 w-4' : 'bg-slate-300 w-1.5'}`}
            />
          </div>
      )}

      {/* Heart Animation */}
      {showLikeAnimation && (
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32 text-red-500 animate-like-heart drop-shadow-2xl">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </div>
      )}

      {/* Bottom Gradient Scrim */}
      <div className="absolute inset-x-0 bottom-0 z-20 h-3/4 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 right-16 z-30 p-6 pb-8 flex flex-col justify-end gap-4 pointer-events-none">
          {collections.length > 0 && (
            <div className="flex flex-wrap gap-2 pointer-events-auto">
                {collections.map((col, idx) => (
                <span 
                    key={idx} 
                    className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-white/60 backdrop-blur-md text-slate-800 shadow-sm"
                    style={{ borderLeft: `3px solid ${col.color}` }}
                >
                    {col.name}
                </span>
                ))}
            </div>
          )}
          <h2 className="text-xl md:text-3xl font-black leading-tight text-slate-900 line-clamp-3 tracking-tight drop-shadow-sm">
            {paper.title}
          </h2>
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span className="text-slate-500">
              {new Date(paper.published_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
            <span>{currentImageIndex === 1 ? 'Tap to expand image' : 'Tap to view details'}</span>
          </div>
      </div>

      {/* Side Actions Bar - Soft Glassmorphism */}
  <div className="absolute right-3 bottom-12 z-40 flex flex-col items-center gap-6 pointer-events-auto">
        
        {/* Like */}
        <div className="flex flex-col items-center gap-1 group">
          <button 
            onClick={toggleLike}
            className={`p-3.5 rounded-full backdrop-blur-md shadow-sm transition-all active:scale-90 duration-300 group-hover:scale-110 ${liked ? 'bg-red-50 text-red-500 shadow-red-100' : 'bg-white/40 text-slate-700 hover:bg-white'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
          <span className="text-[10px] font-bold text-slate-400/80">{paper.total_likes}</span>
        </div>

        {/* Dislike */}
        <div className="flex flex-col items-center gap-1 group">
          <button 
            onClick={toggleDislike}
            className={`p-3.5 rounded-full backdrop-blur-md shadow-sm transition-all active:scale-90 duration-300 group-hover:scale-110 ${disliked ? 'bg-indigo-50 text-indigo-500' : 'bg-white/40 text-slate-700 hover:bg-white'}`}
          >
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={disliked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>
          </button>
          <span className="text-[10px] font-bold text-slate-400/80">Dislike</span>
        </div>

        {/* Save */}
        <div className="flex flex-col items-center gap-1 group">
          <button 
            onClick={(e) => {
                e.stopPropagation();
                setIsCollectionOpen(true);
            }}
            className={`p-3.5 rounded-full backdrop-blur-md shadow-sm transition-all active:scale-90 duration-300 group-hover:scale-110 ${collections.length > 0 ? 'bg-emerald-50 text-emerald-600 shadow-emerald-100' : 'bg-white/40 text-slate-700 hover:bg-white'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={collections.length > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          </button>
          <span className="text-[10px] font-bold text-slate-400/80">Save</span>
        </div>

        {/* PDF */}
        <div className="flex flex-col items-center gap-1 group">
          <a 
            href={paper.url} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-3.5 rounded-full bg-white/40 backdrop-blur-md text-slate-700 transition-all hover:bg-white active:scale-90 shadow-sm group-hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </a>
          <span className="text-[10px] font-bold text-slate-400/80">PDF</span>
        </div>

      </div>
      
      <DetailDrawer
        paper={paper}
        collections={collections}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onTeaserClick={openTeaser}
        onDragProgress={handleDragProgress}
      />

      <CollectionDrawer
        paper={paper}
        currentCollections={collections}
        availableCollections={availableCollections}
        collectionIdMap={collectionIdMap}
        onUpdate={setCollections}
        isOpen={isCollectionOpen}
        onClose={() => setIsCollectionOpen(false)}
      />

    </div>
    
    {/* Full Screen Image Overlay */}
    {showFullScreenTeaser && (
        <div 
            className={`fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center cursor-zoom-out ${isClosingTeaser ? 'animate-fade-out' : 'animate-fade-in'}`}
            onClick={(e) => {
                e.stopPropagation();
                closeTeaser();
            }}
        >
             <img 
                src={teaserImageUrl}
                alt="Full Screen Teaser"
                className={`
                    ${isTeaserPortrait ? 'w-full h-full' : 'w-[100vh] h-[100vw] max-w-none'} 
                    object-contain 
                    origin-center 
                    ${getTeaserAnimation()}
                `}
             />
             <div 
                className={`
                    fixed text-white/50 text-xs font-bold uppercase tracking-widest whitespace-nowrap 
                    ${isTeaserPortrait ? 'top-8 left-1/2 -translate-x-1/2' : 'right-6 top-1/2 -translate-y-1/2 rotate-90'} 
                    ${isClosingTeaser ? 'opacity-0 transition-opacity duration-300' : ''}
                `}
             >
                Tap to close
             </div>
        </div>
    )}
    </>
  );
};

export default PaperCard;