import React from 'react';

interface LegalPageProps {
    title: string;
    lastUpdated: string;
    children: React.ReactNode;
}

export default function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
    return (
        <div className="min-h-screen bg-white dark:bg-black pt-24 pb-20">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
                <header className="mb-12">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-2">
                        {title}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                        Last updated: {lastUpdated}
                    </p>
                </header>
                <div className="prose prose-zinc dark:prose-invert max-w-none">
                    {/* Manual prose-like styles since we don't have the plugin */}
                    <div className="space-y-8 text-base leading-7 text-gray-700 dark:text-zinc-300">
                        {children}
                    </div>
                </div>
                <div className="mt-16 pt-8 border-t border-gray-100 dark:border-zinc-800">
                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                        If you have questions about MonitorDeals, please check this page again for updates.
                    </p>
                </div>
            </div>
        </div>
    );
}
