'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { X, Clock, Search, Scale } from 'lucide-react';
import { mockMonitors } from "@/lib/mockData";
import MonitorCard from "@/components/MonitorCard";
import CustomSelect from '@/components/CustomSelect';
import { MonitorGridSkeleton } from '@/components/MonitorCardSkeleton';

function DealsPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get('q') || '';
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBrand, setSelectedBrand] = useState<string>('All');
    const [selectedResolution, setSelectedResolution] = useState<string>('All');
    const [selectedRefresh, setSelectedRefresh] = useState<string>('All');
    const [sortBy, setSortBy] = useState<string>('featured');

    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [isFiltering, setIsFiltering] = useState(false);
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    useEffect(() => {
        setSearchTerm(query);
    }, [query]);

    // Debounce search query from URL
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);
        return () => clearTimeout(timer);
    }, [query]);

    const clearAllFilters = () => {
        setSelectedBrand('All');
        setSelectedResolution('All');
        setSelectedRefresh('All');
        if (query) {
            router.push('/deals');
        }
    };

    const removeFilter = (type: string) => {
        if (type === 'brand') setSelectedBrand('All');
        if (type === 'resolution') setSelectedResolution('All');
        if (type === 'refresh') setSelectedRefresh('All');
        if (type === 'search') router.push('/deals');
    };

    const hasActiveFilters = selectedBrand !== 'All' || selectedResolution !== 'All' || selectedRefresh !== 'All' || query !== '';

    // unique brands
    const brands = ['All', ...Array.from(new Set(mockMonitors.map(m => m.specs.brand)))];
    const resolutions = ['All', ...Array.from(new Set(mockMonitors.map(m => m.specs.resolution)))];
    const refreshRates = ['All', ...Array.from(new Set(mockMonitors.map(m => m.specs.refreshRate)))];

    const filteredMonitors = mockMonitors
        .filter(monitor => {
            const currentSearch = debouncedQuery.toLowerCase();
            const searchMatch = !debouncedQuery ||
                monitor.title.toLowerCase().includes(currentSearch) ||
                monitor.specs.brand.toLowerCase().includes(currentSearch) ||
                monitor.specs.resolution.toLowerCase().includes(currentSearch);

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

    // Handle filtering sequence
    useEffect(() => {
        if (isFirstLoad) {
            const timer = setTimeout(() => setIsFirstLoad(false), 1000);
            return () => clearTimeout(timer);
        }

        setIsFiltering(true);
        const timer = setTimeout(() => {
            setIsFiltering(false);
        }, 350); // Min skeleton duration + quick transitions

        return () => clearTimeout(timer);
    }, [selectedBrand, selectedResolution, selectedRefresh, sortBy, debouncedQuery, isFirstLoad]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 border-b border-gray-200 pb-6 lg:flex-row lg:items-center dark:border-gray-800">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {query ? `Results for "${query}"` : 'All Deals'}
                    </h1>
                    <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span>{filteredMonitors.length} monitors found</span>
                        <span className="mx-2 opacity-25 dark:opacity-20">•</span>
                        <span className="flex items-center gap-1.5 text-gray-500/60 dark:text-gray-400/50">
                            <Clock className="h-3.5 w-3.5" />
                            <span>Last updated: {mockMonitors[0].lastUpdated}</span>
                        </span>
                    </div>
                </div>

                {searchParams.get('mode') === 'compare' && (
                    <div className="flex animate-fade-in-premium items-center gap-3 rounded-2xl bg-purple-50 px-5 py-3 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/30 shadow-sm shadow-purple-500/5">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-white">
                            <Scale className="h-3 w-3" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs font-bold text-purple-900 dark:text-purple-300">Compare Mode Active</p>
                            <p className="text-[11px] text-purple-700 dark:text-purple-400 opacity-80">Select a monitor below to add it to your comparison list.</p>
                        </div>
                        <button
                            onClick={() => {
                                const params = new URLSearchParams(searchParams.toString());
                                params.delete('mode');
                                router.push(`/deals?${params.toString()}`);
                            }}
                            className="ml-auto rounded-lg p-1 text-purple-400 hover:bg-purple-100 hover:text-purple-600 dark:text-purple-500 dark:hover:bg-purple-900/40"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                    <CustomSelect
                        value={selectedBrand}
                        onChange={setSelectedBrand}
                        options={brands.map(brand => ({ value: brand, label: brand === 'All' ? 'All Brands' : brand }))}
                    />

                    <CustomSelect
                        value={selectedResolution}
                        onChange={setSelectedResolution}
                        options={resolutions.map(res => ({ value: res, label: res === 'All' ? 'All Resolutions' : res }))}
                    />

                    <CustomSelect
                        value={selectedRefresh}
                        onChange={setSelectedRefresh}
                        options={refreshRates.map(rate => ({ value: rate, label: rate === 'All' ? 'All Refresh Rates' : rate }))}
                    />

                    <div className="hidden h-6 w-px bg-gray-300 dark:bg-gray-700 sm:block"></div>

                    <CustomSelect
                        value={sortBy}
                        onChange={setSortBy}
                        options={[
                            { value: 'featured', label: 'Featured' },
                            { value: 'price-low', label: 'Price: Low to High' },
                            { value: 'price-high', label: 'Price: High to Low' }
                        ]}
                    />
                </div>
            </div>

            {/* Active Filter Chips */}
            {hasActiveFilters && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                    {query && (
                        <button
                            onClick={() => removeFilter('search')}
                            className="active-press group flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 transition-all hover:border-purple-300 hover:bg-purple-50 hover:text-purple-600 dark:hover:border-purple-900/50 dark:hover:bg-purple-900/20 dark:hover:text-purple-400"
                        >
                            Search: {query}
                            <X className="h-3 w-3 transition-colors group-hover:text-purple-500" />
                        </button>
                    )}
                    {selectedBrand !== 'All' && (
                        <button
                            onClick={() => removeFilter('brand')}
                            className="active-press group flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 transition-all hover:border-purple-300 hover:bg-purple-50 hover:text-purple-600 dark:hover:border-purple-900/50 dark:hover:bg-purple-900/20 dark:hover:text-purple-400"
                        >
                            {selectedBrand}
                            <X className="h-3 w-3 transition-colors group-hover:text-purple-500" />
                        </button>
                    )}
                    {selectedResolution !== 'All' && (
                        <button
                            onClick={() => removeFilter('resolution')}
                            className="active-press group flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 transition-all hover:border-purple-300 hover:bg-purple-50 hover:text-purple-600 dark:hover:border-purple-900/50 dark:hover:bg-purple-900/20 dark:hover:text-purple-400"
                        >
                            {selectedResolution}
                            <X className="h-3 w-3 transition-colors group-hover:text-purple-500" />
                        </button>
                    )}
                    {selectedRefresh !== 'All' && (
                        <button
                            onClick={() => removeFilter('refresh')}
                            className="active-press group flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 transition-all hover:border-purple-300 hover:bg-purple-50 hover:text-purple-600 dark:hover:border-purple-900/50 dark:hover:bg-purple-900/20 dark:hover:text-purple-400"
                        >
                            {selectedRefresh}
                            <X className="h-3 w-3 transition-colors group-hover:text-purple-500" />
                        </button>
                    )}
                    <button
                        onClick={clearAllFilters}
                        className="ml-1 text-xs font-semibold text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                    >
                        Clear all
                    </button>
                </div>
            )}

            <div className="relative mt-8">
                {isFiltering ? (
                    <div className="absolute inset-x-0 top-0 z-10">
                        <MonitorGridSkeleton count={8} />
                    </div>
                ) : null}

                <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-opacity duration-150 ${isFiltering ? 'opacity-0' : 'opacity-100'}`}>
                    {filteredMonitors.map((monitor, index) => (
                        <div
                            key={monitor.id}
                            className={isFirstLoad ? 'animate-card-entrance' : 'animate-fade-in-premium'}
                            style={{ animationDelay: isFirstLoad ? `${Math.min(index * 40, 400)}ms` : '0ms' }}
                        >
                            <MonitorCard monitor={monitor} />
                        </div>
                    ))}
                </div>

                {!isFiltering && filteredMonitors.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <Search className="mb-4 h-12 w-12 text-gray-400 opacity-20 dark:text-gray-500" />
                        <p className="text-gray-500">No monitors found matching your filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function DealsPage() {
    return (
        <Suspense fallback={
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-2">
                    <div className="h-10 w-48 animate-calm-pulse rounded-lg bg-gray-100 dark:bg-zinc-800" />
                    <div className="h-5 w-64 animate-calm-pulse rounded-lg bg-gray-50/50 dark:bg-zinc-800/40" />
                </div>
                <MonitorGridSkeleton count={8} />
            </div>
        }>
            <DealsPageContent />
        </Suspense>
    );
}
