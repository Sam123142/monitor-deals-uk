'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, Search, Plus, Check } from 'lucide-react';
import { mockMonitors, Monitor } from '@/lib/mockData';

interface AddToComparePickerProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (id: string) => void;
    alreadySelectedIds: string[];
}

export default function AddToComparePicker({
    isOpen,
    onClose,
    onSelect,
    alreadySelectedIds
}: AddToComparePickerProps) {
    const [query, setQuery] = useState('');
    const [mounted, setMounted] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            inputRef.current?.focus();
        } else {
            document.body.style.overflow = '';
            setQuery('');
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!mounted || !isOpen) return null;

    const filteredMonitors = mockMonitors.filter(monitor => {
        const s = query.toLowerCase();
        return (
            monitor.title.toLowerCase().includes(s) ||
            monitor.specs.brand.toLowerCase().includes(s) ||
            monitor.specs.resolution.toLowerCase().includes(s)
        );
    });

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            {/* Modal / Bottom Sheet Container */}
            <div
                ref={modalRef}
                className={`relative flex flex-col w-full bg-white dark:bg-zinc-950 shadow-2xl transition-all duration-300 ease-out
                    sm:max-w-xl sm:rounded-2xl sm:max-h-[85vh] sm:animate-modal-in
                    h-[90vh] mt-auto sm:mt-0 rounded-t-3xl sm:h-auto animate-sheet-in
                `}
                role="dialog"
                aria-modal="true"
                aria-labelledby="picker-title"
                style={{ overscrollBehavior: 'contain' }}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-zinc-800 shrink-0">
                    <div>
                        <h2 id="picker-title" className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                            Add a monitor to compare
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Choose 1 monitor (up to 4 total)
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 transition-colors"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="p-4 border-b border-gray-50 dark:border-zinc-900 shrink-0">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search monitors..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full pl-9 pr-10 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                        />
                        {query && (
                            <button
                                onClick={() => setQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Results List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 overscroll-contain">
                    {filteredMonitors.length > 0 ? (
                        filteredMonitors.map(monitor => {
                            const isSelected = alreadySelectedIds.includes(monitor.id);
                            return (
                                <div
                                    key={monitor.id}
                                    className={`flex items-center gap-4 p-3 rounded-xl border transition-all
                                        ${isSelected
                                            ? 'bg-gray-50/50 dark:bg-zinc-900/30 border-gray-100 dark:border-zinc-800 opacity-60'
                                            : 'bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 hover:border-purple-200 dark:hover:border-purple-900/40 hover:shadow-lg hover:shadow-purple-500/5 hover:-translate-y-0.5'
                                        }
                                    `}
                                >
                                    <div className="relative h-14 w-20 shrink-0 rounded-lg bg-gray-100 dark:bg-zinc-800 overflow-hidden">
                                        <Image
                                            src={monitor.image}
                                            alt={monitor.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                            {monitor.title}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-gray-500">
                                                {monitor.specs.resolution}
                                            </span>
                                            <span className="text-[10px] bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-gray-500">
                                                {monitor.specs.refreshRate}
                                            </span>
                                        </div>
                                        <p className="text-xs font-bold text-purple-600 dark:text-purple-400 mt-1">
                                            £{monitor.price.toFixed(2)}
                                        </p>
                                    </div>
                                    <button
                                        disabled={isSelected}
                                        onClick={() => onSelect(monitor.id)}
                                        className={`active-press flex items-center justify-center h-10 px-4 rounded-xl text-xs font-bold transition-all
                                            ${isSelected
                                                ? 'bg-gray-100 dark:bg-zinc-800 text-gray-400 cursor-not-allowed'
                                                : 'premium-button-card !py-0'
                                            }
                                        `}
                                    >
                                        {isSelected ? (
                                            <>
                                                <Check className="h-3.5 w-3.5 mr-1.5" />
                                                Selected
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="h-3.5 w-3.5 mr-1.5" />
                                                Add
                                            </>
                                        )}
                                    </button>
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="h-12 w-12 rounded-full bg-gray-50 dark:bg-zinc-900 flex items-center justify-center mb-3">
                                <Search className="h-6 w-6 text-gray-300" />
                            </div>
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                                No monitors found
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Try a different search term...
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}
