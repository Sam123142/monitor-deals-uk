'use client';

import Link from 'next/link';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-black/80">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        MonitorDeals
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
                            className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-gray-800 dark:bg-zinc-900 dark:text-white dark:focus:bg-zinc-800 dark:focus:border-blue-500"
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
                    <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                        Home
                    </Link>
                    <Link href="/deals" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                        Deals
                    </Link>
                </nav>
            </div>
        </header>
    );
}
