'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ease-out ${isScrolled
                ? 'border-gray-200 bg-white/90 shadow-sm backdrop-blur-lg dark:border-gray-800 dark:bg-black/95'
                : 'border-transparent bg-white/80 backdrop-blur-md dark:border-transparent dark:bg-black/80'
                }`}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="active-press group relative transition-all duration-200 ease-out">
                    <span className="relative inline-block text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-[length:200%_auto] bg-clip-text text-transparent transition-all duration-300 group-hover:bg-[position:100%_center] group-hover:brightness-110 group-hover:-translate-y-[1px] group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]">
                        MonitorDeals
                        <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-blue-500/40 transition-all duration-300 ease-out group-hover:w-full"></span>
                    </span>
                </Link>
                <div className="hidden flex-1 items-center justify-center px-8 md:flex">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const query = formData.get('q');
                            if (query) {
                                window.location.href = `/deals?q=${encodeURIComponent(query.toString())}`;
                            }
                        }}
                        className="relative w-full max-w-lg"
                    >
                        <input
                            name="q"
                            type="text"
                            placeholder="Search monitors..."
                            className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2 pl-10 text-sm text-gray-900 dark:border-gray-800 dark:bg-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500/20"
                        />
                        <button type="submit" className="absolute left-3 top-2.5 text-gray-400 hover:text-blue-500">
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </form>
                </div>
                <nav className="flex items-center gap-6">
                    <Link href="/" className="rounded-md px-2 py-1 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:underline focus-visible:underline underline-offset-4 transition-colors">
                        Home
                    </Link>
                    <Link href="/deals" className="rounded-md px-2 py-1 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:underline focus-visible:underline underline-offset-4 transition-colors">
                        Deals
                    </Link>
                </nav>
            </div>
        </header>
    );
}
