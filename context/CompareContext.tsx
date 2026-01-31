'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { X, Check } from 'lucide-react';

interface Toast {
    message: string;
    visible: boolean;
}

interface CompareContextType {
    compareIds: string[];
    addToCompare: (id: string) => void;
    removeFromCompare: (id: string) => void;
    clearCompare: () => void;
    toast: Toast;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
    const [compareIds, setCompareIds] = useState<string[]>([]);
    const [toast, setToast] = useState<Toast>({ message: '', visible: false });
    const router = useRouter();

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('compareIds');
        if (stored) {
            setCompareIds(JSON.parse(stored));
        }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem('compareIds', JSON.stringify(compareIds));
    }, [compareIds]);

    const showToast = (message: string) => {
        setToast({ message, visible: true });
        setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 1200);
    };

    const addToCompare = (id: string) => {
        if (compareIds.includes(id)) {
            // Already added, go to compare page
            router.push(`/compare?ids=${compareIds.join(',')}`);
            return;
        }

        if (compareIds.length >= 4) {
            showToast('You can compare up to 4 monitors');
            return;
        }

        let newIds = [...compareIds, id];
        let message = 'Added to compare';

        setCompareIds(newIds);
        showToast(message);

        // Navigate logic
        if (newIds.length === 1) {
            router.push('/compare');
        } else {
            router.push(`/compare?ids=${newIds.join(',')}`);
        }
    };

    const removeFromCompare = (id: string) => {
        setCompareIds(prev => prev.filter(cid => cid !== id));
        showToast('Removed from compare');
    };

    const clearCompare = () => {
        setCompareIds([]);
    };

    return (
        <CompareContext.Provider value={{ compareIds, addToCompare, removeFromCompare, clearCompare, toast }}>
            {children}
            {/* Global Toast Component */}
            <div
                className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-xl bg-gray-900/90 px-4 py-3 text-sm font-medium text-white shadow-xl backdrop-blur-md transition-all duration-300 ease-out dark:bg-white/90 dark:text-black ${toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
                    }`}
            >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                </div>
                {toast.message}
            </div>
        </CompareContext.Provider>
    );
}

export function useCompare() {
    const context = useContext(CompareContext);
    if (context === undefined) {
        throw new Error('useCompare must be used within a CompareProvider');
    }
    return context;
}
