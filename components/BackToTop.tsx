'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`active-press fixed bottom-8 right-6 z-50 flex h-11 items-center justify-center gap-2 overflow-hidden rounded-full border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 shadow-lg transition-all duration-300 md:bottom-10 md:right-10 dark:border-gray-800 dark:bg-zinc-900 dark:text-gray-200 ${isVisible
                ? 'translate-y-0 opacity-100 pointer-events-auto'
                : 'translate-y-4 opacity-0 pointer-events-none'
                } group hover:border-purple-500/50 hover:text-purple-600 dark:hover:border-purple-400/50 dark:hover:text-purple-400`}
        >
            <ArrowUp className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 ease-out group-hover:max-w-[3rem]">
                Top
            </span>
        </button>
    );
}
