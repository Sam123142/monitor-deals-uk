'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { mockMonitors } from "@/lib/mockData";
import MonitorCard from "@/components/MonitorCard";

function DealsPageContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    const [selectedBrand, setSelectedBrand] = useState<string>('All');
    const [selectedResolution, setSelectedResolution] = useState<string>('All');
    const [selectedRefresh, setSelectedRefresh] = useState<string>('All');
    const [sortBy, setSortBy] = useState<string>('featured');

    // unique brands
    const brands = ['All', ...Array.from(new Set(mockMonitors.map(m => m.specs.brand)))];
    const resolutions = ['All', ...Array.from(new Set(mockMonitors.map(m => m.specs.resolution)))];
    const refreshRates = ['All', ...Array.from(new Set(mockMonitors.map(m => m.specs.refreshRate)))];

    const filteredMonitors = mockMonitors
        .filter(monitor => {
            const searchMatch = !query ||
                monitor.title.toLowerCase().includes(query.toLowerCase()) ||
                monitor.specs.brand.toLowerCase().includes(query.toLowerCase()) ||
                monitor.specs.resolution.toLowerCase().includes(query.toLowerCase());

            const brandMatch = selectedBrand === 'All' || monitor.specs.brand === selectedBrand;
            const resolutionMatch = selectedResolution === 'All' || monitor.specs.resolution === selectedResolution;
            const refreshMatch = selectedRefresh === 'All' || monitor.specs.refreshRate === selectedRefresh;
            return searchMatch && brandMatch && resolutionMatch && refreshMatch;
        })
        .sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            return 0; // featured/default
        });

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 border-b border-gray-200 pb-6 lg:flex-row lg:items-center dark:border-gray-800">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {query ? `Results for "${query}"` : 'All Deals'}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {filteredMonitors.length} monitors found
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-900 dark:text-white"
                    >
                        <option value="All">All Brands</option>
                        {brands.filter(b => b !== 'All').map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>

                    <select
                        value={selectedResolution}
                        onChange={(e) => setSelectedResolution(e.target.value)}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-900 dark:text-white"
                    >
                        <option value="All">All Resolutions</option>
                        {resolutions.filter(r => r !== 'All').map(res => (
                            <option key={res} value={res}>{res}</option>
                        ))}
                    </select>

                    <select
                        value={selectedRefresh}
                        onChange={(e) => setSelectedRefresh(e.target.value)}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-900 dark:text-white"
                    >
                        <option value="All">All Refresh Rates</option>
                        {refreshRates.filter(r => r !== 'All').map(rate => (
                            <option key={rate} value={rate}>{rate}</option>
                        ))}
                    </select>

                    <div className="hidden h-6 w-px bg-gray-300 dark:bg-gray-700 sm:block"></div>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-900 dark:text-white"
                    >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredMonitors.map((monitor) => (
                    <MonitorCard key={monitor.id} monitor={monitor} />
                ))}
            </div>

            {filteredMonitors.length === 0 && (
                <div className="py-20 text-center text-gray-500">
                    No monitors found matching your filters.
                </div>
            )}
        </div>
    );
}

export default function DealsPage() {
    return (
        <Suspense fallback={<div className="py-20 text-center">Loading deals...</div>}>
            <DealsPageContent />
        </Suspense>
    );
}
