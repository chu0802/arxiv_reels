import React, { useState, useEffect, useMemo } from 'react';
import { PaperData, Collection } from '../types';
import { addCollectionClient, removeCollectionClient } from '../services/collectionsClient';

interface CollectionDrawerProps {
  paper: PaperData;
  currentCollections: Collection[];
        availableCollections: Collection[];
    collectionIdMap?: Record<string, string>;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (newCollections: Collection[]) => void;
}

const CollectionDrawer: React.FC<CollectionDrawerProps> = ({ 
    paper, 
    currentCollections, 
        availableCollections,
    collectionIdMap = {},
    isOpen, 
    onClose,
    onUpdate
}) => {
  const [inputText, setInputText] = useState('');
  const [shouldRender, setShouldRender] = useState(false);
  const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setShow(true));
      });
    } else {
      setShow(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

    const globalColors = useMemo(() => {
            const map: Record<string, string> = {};
            availableCollections.forEach(c => {
                map[c.name] = c.color;
            });
            currentCollections.forEach(c => {
                map[c.name] = map[c.name] || c.color;
            });
            return map;
    }, [availableCollections, currentCollections]);

  const allExistingCollections = useMemo(() => {
    const names = new Set(Object.keys(globalColors));
        currentCollections.forEach(c => names.add(c.name));
    return Array.from(names).sort();
  }, [globalColors, currentCollections]);

  const filteredCollections = allExistingCollections.filter(c => 
    c.toLowerCase().includes(inputText.toLowerCase())
  );

  const getCollectionColor = (name: string) => {
      return globalColors[name] || '#cbd5e1'; 
  };

    const handleToggle = async (name: string) => {
        const exists = currentCollections.some(c => c.name === name);
        let newCols: Collection[];

        if (exists) {
                newCols = currentCollections.filter(c => c.name !== name);
        } else {
                newCols = [...currentCollections, { name, color: getCollectionColor(name) }];
        }

        setErrorMessage(null);
        onUpdate(newCols);

        try {
            setIsSaving(true);
                    if (exists) {
                        const collection_id = collectionIdMap[name];
                        const result = await removeCollectionClient(name, paper.paper_id, collection_id);
                if (!result?.success) {
                    throw new Error(result?.error || 'Remove collection failed');
                }
            } else {
                        const collection_id = collectionIdMap[name];
                        const result = await addCollectionClient(name, paper.paper_id, collection_id);
                if (!result?.success) {
                    throw new Error(result?.error || 'Add collection failed');
                }
            }
        } catch (err: any) {
            console.error('Toggle collection failed', err);
            onUpdate(currentCollections);
            setErrorMessage(err?.message || 'Failed to update collection');
        } finally {
            setIsSaving(false);
        }

    if (name.toLowerCase() === inputText.toLowerCase()) {
        setInputText('');
    }
  };

        const handleCreate = async () => {
    if (!inputText.trim()) return;
    const name = inputText.trim();
    
        if (!currentCollections.some(c => c.name === name)) {
                const newCol: Collection = { name, color: getCollectionColor(name) };
                const optimistic = [...currentCollections, newCol];
                setErrorMessage(null);
                setIsSaving(true);
                onUpdate(optimistic);

                try {
                    const result = await addCollectionClient(name, paper.paper_id);
                    if (!result?.success) {
                        throw new Error(result?.error || 'Add collection failed');
                    }
                } catch (err: any) {
                    console.error('Add collection failed', err);
                    onUpdate(currentCollections);
                    setErrorMessage(err?.message || 'Failed to add collection');
                } finally {
                    setIsSaving(false);
                }
        }
        setInputText('');
  };

  if (!shouldRender) return null;

  return (
    <div 
        className={`fixed inset-0 z-[70] flex flex-col justify-end bg-slate-900/10 backdrop-blur-sm transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
    >
      <div 
        className={`w-full bg-white rounded-t-3xl shadow-2xl flex flex-col max-h-[85vh] transition-transform duration-300 transform ${show ? 'translate-y-0' : 'translate-y-full'}`}
        onClick={(e) => e.stopPropagation()}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* Handle Bar */}
        <div className="w-full flex justify-center pt-3 pb-1">
            <div className="w-12 h-1 bg-slate-200 rounded-full"></div>
        </div>

        {/* Header - No Border */}
        <div className="px-6 py-4 flex justify-between items-center">
            <div>
                <h3 className="text-xl font-bold text-slate-900">Save to Collection</h3>
                <p className="text-xs text-slate-400 truncate max-w-[250px] mt-0.5">{paper.title}</p>
            </div>
            <button 
                onClick={onClose} 
                className="text-sm font-bold text-slate-900 hover:text-slate-700 bg-slate-100 px-4 py-2 rounded-full transition-colors"
            >
                Done
            </button>
        </div>

        {/* Search / Create Input - Softened */}
        <div className="px-6 pt-2 pb-4">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    className="block w-full pl-11 pr-4 py-4 border-none rounded-2xl leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100 sm:text-base transition-all"
                    placeholder="Search or create collection..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleCreate();
                        }
                    }}
                    autoFocus
                />
                {isSaving && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">Saving…</div>
                )}
            </div>
        </div>

        {errorMessage && (
          <div className="px-6 pb-2 text-sm text-red-500">
            {errorMessage}
          </div>
        )}

        {/* "Create New" Action */}
        {inputText && !allExistingCollections.some(c => c.toLowerCase() === inputText.toLowerCase()) && (
            <div className="px-6 pb-2">
                <button 
                    onClick={handleCreate}
                    className="w-full py-3 flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 border-none rounded-2xl text-slate-700 font-medium transition-all"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Create "{inputText}"
                </button>
            </div>
        )}

        {/* Collection List */}
        <div className="flex-1 overflow-y-auto px-6 pb-8 min-h-[200px] modern-scrollbar">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 mt-2">All Collections</h4>
            
            <div className="flex flex-wrap gap-2.5">
                {filteredCollections.length > 0 ? (
                    filteredCollections.map((colName) => {
                        const isSelected = currentCollections.some(c => c.name === colName);
                        const color = getCollectionColor(colName);
                        
                        return (
                            <button
                                key={colName}
                                onClick={() => handleToggle(colName)}
                                className={`
                                    px-4 py-2.5 rounded-xl text-sm font-bold transition-all
                                    flex items-center gap-2
                                    ${isSelected 
                                        ? 'text-slate-900 shadow-sm scale-105 ring-2 ring-white' 
                                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                    }
                                `}
                                style={isSelected ? { backgroundColor: color } : {}}
                            >
                                {isSelected && (
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                )}
                                {colName}
                            </button>
                        );
                    })
                ) : (
                    <div className="w-full text-center py-8 text-slate-400 text-sm">
                        No collections found.
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionDrawer;