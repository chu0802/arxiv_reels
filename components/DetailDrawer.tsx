import React, { useEffect, useState, useRef } from 'react';
import { PaperData, Collection } from '../types';

interface DetailDrawerProps {
  paper: PaperData;
  collections?: Collection[];
  isOpen: boolean;
  onClose: () => void;
  onTeaserClick?: () => void;
}

const DetailDrawer: React.FC<DetailDrawerProps> = ({ paper, collections, isOpen, onClose, onTeaserClick }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [show, setShow] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const lastY = useRef(0);
  const velocity = useRef(0);
  const lastTime = useRef(0);

  const displayCollections = collections || paper.collections;
  const teaserImageUrl = `https://www.scholar-inbox.com/teaser_figures/${paper.paper_id}.0.jpeg`;

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
      setDragY(0);
      // Reset error state when reopening
      setImageError(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            setShow(true);
        });
      });
    } else {
      setShow(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
        setDragY(0);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (scrollRef.current && scrollRef.current.scrollTop <= 0) {
      startY.current = e.touches[0].clientY;
      lastY.current = e.touches[0].clientY;
      lastTime.current = Date.now();
      velocity.current = 0;
    } else {
      startY.current = -1;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current === -1) return;
    
    // If content is scrolled, don't drag
    if (scrollRef.current && scrollRef.current.scrollTop > 0) {
      startY.current = -1;
      setIsDragging(false);
      setDragY(0);
      return;
    }

    const currentY = e.touches[0].clientY;
    const currentTime = Date.now();
    const delta = currentY - startY.current;
    
    // Calculate velocity for momentum
    const timeDiff = currentTime - lastTime.current;
    if (timeDiff > 0) {
      velocity.current = (currentY - lastY.current) / timeDiff;
    }
    lastY.current = currentY;
    lastTime.current = currentTime;

    if (delta > 0) {
      // Pulling down - direct 1:1 mapping for responsive feel
      setIsDragging(true);
      setDragY(delta);
      
      // Prevent scroll bounce
      if (e.cancelable) {
        e.preventDefault();
      }
    } else {
      setIsDragging(false);
      setDragY(0);
    }
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      const drawerHeight = drawerRef.current?.offsetHeight || window.innerHeight * 0.85;
      // Close if dragged more than 25% or if velocity is high enough (flick gesture)
      const shouldClose = dragY > drawerHeight * 0.25 || velocity.current > 0.5;
      
      if (shouldClose) {
        // Animate to full close with remaining momentum
        setIsClosing(true);
        setDragY(drawerHeight);
        setTimeout(() => {
          onClose();
        }, 300);
      } else {
        // Snap back
        setDragY(0);
      }
      setIsDragging(false);
    }
    startY.current = -1;
    velocity.current = 0;
  };

  if (!shouldRender) return null;

  // Calculate dynamic transition based on state
  const getTransition = () => {
    if (isDragging) return 'none';
    if (isClosing) return 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)';
    return 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)';
  };

  // Calculate opacity based on drag position
  const backdropOpacity = Math.max(0, 1 - dragY / (window.innerHeight * 0.5));

  return (
  <div 
    className={`fixed inset-0 z-[60] flex items-end justify-center md:items-center backdrop-blur-sm overscroll-none ${show ? 'opacity-100' : 'opacity-0'}`}
    style={{
      backgroundColor: `rgba(15, 23, 42, ${0.1 * backdropOpacity})`,
      transition: isDragging ? 'none' : 'opacity 0.3s ease-out, background-color 0.3s ease-out'
    }}
    onClick={(e) => {
      e.stopPropagation();
      onClose();
    }}
    >
      <div 
        ref={drawerRef}
        className={`
            w-full h-[85vh] md:h-[90vh] md:max-w-4xl bg-white md:rounded-3xl rounded-t-3xl flex flex-col shadow-2xl overflow-hidden relative
        `}
        style={{ 
            transform: show ? `translateY(${dragY}px)` : 'translateY(100%)',
            transition: getTransition(),
            willChange: 'transform'
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Handle Bar */}
        <div className="w-full flex justify-center pt-3 pb-1 shrink-0 z-20" onClick={onClose}>
            <div className="w-12 h-1.5 bg-slate-200/80 rounded-full"></div>
        </div>

        {/* Header with close */}
        <div className="absolute top-5 right-6 z-10">
          <button 
            onClick={onClose}
            className="p-2.5 bg-slate-100/50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-full transition-all"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto overscroll-contain p-6 md:p-12 modern-scrollbar pt-4"
    >
            {/* Header Info */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
                 <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg bg-slate-50 text-slate-500">
                    {paper.venue.name}
                 </span>
                 <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg bg-slate-50 text-slate-500">
                    {paper.year.name}
                 </span>
                 <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50/50 px-3 py-1 rounded-lg">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                    {Math.round(paper.ranking_score * 100)}% Impact
                 </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-8 text-slate-900 tracking-tight">
                {paper.title}
            </h1>

            {/* Collections/Tags */}
            <div className="flex flex-wrap gap-2 mb-10">
                {displayCollections.map((col, idx) => (
                    <span 
                    key={idx} 
                    className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg text-slate-900"
                    style={{ backgroundColor: col.color + '30' }} 
                    >
                     <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: col.color }}></span>
                    {col.name}
                    </span>
                ))}
            </div>

            {/* Authors Section */}
            <div className="mb-10 p-6 bg-slate-50/50 rounded-2xl">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Authors</h3>
                <p className="text-lg text-slate-700 leading-relaxed font-medium">
                    {paper.authors}
                </p>
            </div>

            {/* Teaser Image Section (Only if available) */}
            {!imageError && (
                <div className="mb-10">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Preview</h3>
                    <div 
                        className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm cursor-zoom-in group relative"
                        onClick={onTeaserClick}
                    >
                        <img 
                            src={teaserImageUrl}
                            alt="Paper Preview"
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={() => setImageError(true)}
                        />
                    </div>
                </div>
            )}

            {/* Abstract Section */}
            <div className="prose prose-slate prose-lg max-w-none mb-10">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Abstract</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line text-justify">
                    {paper.abstract}
                </p>
            </div>
            
            {/* Stats Grid - Borderless, soft background */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                 <div className="p-5 bg-slate-50/50 rounded-2xl text-center">
                    <div className="text-2xl font-bold text-slate-900 mb-1">{paper.total_read}</div>
                    <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Reads</div>
                 </div>
                 <div className="p-5 bg-slate-50/50 rounded-2xl text-center">
                    <div className="text-2xl font-bold text-slate-900 mb-1">{paper.total_likes}</div>
                    <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Likes</div>
                 </div>
                 <div className="p-5 bg-slate-50/50 rounded-2xl text-center">
                    <div className="text-xl font-bold text-slate-900 mb-1 truncate px-2">{paper.arxiv_id}</div>
                    <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">ArXiv ID</div>
                 </div>
                 <div className="p-5 bg-slate-50/50 rounded-2xl text-center">
                    <div className="text-2xl font-bold text-slate-900 mb-1">{new Date(paper.published_date).getFullYear()}</div>
                    <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Year</div>
                 </div>
            </div>

             {/* Footer Actions */}
             <div className="flex flex-col gap-4 pb-8">
                <a 
                    href={paper.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-center transition-all shadow-xl shadow-slate-200 hover:shadow-2xl hover:-translate-y-0.5"
                >
                    Read Full Paper (PDF)
                </a>
             </div>
        </div>
      </div>
    </div>
  );
};

export default DetailDrawer;