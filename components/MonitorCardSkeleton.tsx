import React from 'react';

export default function MonitorCardSkeleton() {
    return (
        <div className="flex animate-fade-in-premium h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm dark:border-zinc-800/50 dark:bg-zinc-900/50">
            {/* Image Area */}
            <div className="relative aspect-video w-full animate-calm-pulse bg-gray-100 dark:bg-zinc-800" />

            <div className="flex flex-1 flex-col p-4 pb-5">
                {/* Brand */}
                <div className="mb-2 h-3 w-16 animate-calm-pulse rounded bg-gray-100 dark:bg-zinc-800" />

                {/* Title */}
                <div className="mb-2 h-[3.75rem]">
                    <div className="mb-2 h-5 w-full animate-calm-pulse rounded bg-gray-100 dark:bg-zinc-800" />
                    <div className="h-5 w-2/3 animate-calm-pulse rounded bg-gray-100 dark:bg-zinc-800" />
                </div>

                {/* Specs */}
                <div className="mb-4 h-[4.25rem] flex flex-wrap gap-2">
                    <div className="h-6 w-16 animate-calm-pulse rounded-md bg-gray-50 dark:bg-zinc-800/80" />
                    <div className="h-6 w-20 animate-calm-pulse rounded-md bg-gray-50 dark:bg-zinc-800/80" />
                    <div className="h-6 w-14 animate-calm-pulse rounded-md bg-gray-50 dark:bg-zinc-800/80" />
                </div>

                {/* Footer */}
                <div className="mt-auto border-t border-gray-100 pt-5 dark:border-zinc-800/80 flex items-end justify-between">
                    <div className="flex flex-col gap-1.5">
                        {/* Updated text */}
                        <div className="mb-1 h-2.5 w-24 animate-calm-pulse rounded bg-gray-50 dark:bg-zinc-800/60" />

                        <div className="flex flex-col gap-1">
                            {/* Old Price Strikethrough area */}
                            <div className="h-4 w-12 animate-calm-pulse rounded bg-gray-50 dark:bg-zinc-800/60" />
                            {/* Main Price */}
                            <div className="h-8 w-24 animate-calm-pulse rounded bg-gray-100 dark:bg-zinc-800" />
                        </div>
                    </div>

                    {/* Button Placeholder */}
                    <div className="h-[3.25rem] min-w-[6.5rem] animate-calm-pulse rounded-xl bg-gray-100 dark:bg-zinc-800" />
                </div>
            </div>
        </div>
    );
}

export function MonitorGridSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: count }).map((_, i) => (
                <MonitorCardSkeleton key={i} />
            ))}
        </div>
    );
}
