'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Scale, Plus, X } from 'lucide-react';
import { mockMonitors, Monitor } from '@/lib/mockData';
import { useCompare } from '@/context/CompareContext';
import AddToComparePicker from '@/components/AddToComparePicker';

function CompareContent() {
    const router = useRouter();
    const { compareIds, addToCompare, removeFromCompare, clearCompare } = useCompare();
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [currentMobileIndex, setCurrentMobileIndex] = useState(0);

    // Get monitor objects
    const monitors = compareIds
        .map(id => mockMonitors.find(m => m.id === id))
        .filter((m): m is Monitor => !!m);

    // Spec configuration
    const specs = [
        { label: 'Price', getValue: (m: Monitor) => m.price ? `£${m.price.toFixed(2)}` : '—' },
        { label: 'Screen Size', getValue: (m: Monitor) => m.specs.size || '—' },
        { label: 'Resolution', getValue: (m: Monitor) => m.specs.resolution || '—' },
        { label: 'Refresh Rate', getValue: (m: Monitor) => m.specs.refreshRate || '—' },
        { label: 'Brand', getValue: (m: Monitor) => m.specs.brand || '—' },
        { label: 'Last Updated', getValue: (m: Monitor) => m.lastUpdated || '—' },
    ];

    // Case 1: No monitors selected
    if (monitors.length === 0) {
        return (
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800">
                    <Scale className="h-8 w-8 text-gray-400" />
                </div>
                <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Compare Monitors</h1>
                <p className="mb-8 max-w-md text-gray-500">
                    Select at least 2 monitors to see a side-by-side comparison.
                </p>
                <Link
                    href="/deals"
                    className="premium-button-primary px-6 py-3 text-sm"
                >
                    Browse Deals
                </Link>
            </div>
        );
    }

    const showPlaceholder = monitors.length > 0 && monitors.length < 4;
    const totalColumns = monitors.length + (showPlaceholder ? 1 : 0);

    const getTitle = () => {
        if (monitors.length === 1) return 'Select another monitor to compare';
        return `Compare ${monitors.length} Monitors`;
    };

    const getSubheading = () => {
        if (monitors.length < 2) return 'Select at least 2 monitors to see a side-by-side comparison.';
        return 'Compare specs side by side. Add up to 4 monitors.';
    };

    const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollLeft = e.currentTarget.scrollLeft;
        const width = e.currentTarget.offsetWidth;
        const index = Math.round(scrollLeft / width);
        if (index !== currentMobileIndex && index < monitors.length) {
            setCurrentMobileIndex(index);
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
                <Link
                    href="/deals"
                    className="premium-link mb-8 inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 px-2 py-1 rounded-md"
                >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    <span>Back to Deals</span>
                </Link>
                <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-400 md:hidden">
                        Swipe to compare &rarr;
                    </span>
                    <button
                        onClick={clearCompare}
                        className="text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-500"
                    >
                        Clear comparison
                    </button>
                </div>
            </div>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {getTitle()}
                </h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    {getSubheading()}
                </p>
            </div>

            {/* Desktop View: Wide Table */}
            <div className="hidden md:block relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-zinc-900">
                <div className="overflow-x-auto pb-4">
                    <div className="min-w-[800px] lg:min-w-full">
                        <div className="grid" style={{ gridTemplateColumns: `200px repeat(${totalColumns}, minmax(280px, 1fr))` }}>

                            {/* Sticky Header Row: Specs Label + Monitor Headers */}
                            <div className="sticky left-0 top-0 z-30 col-span-1 border-b border-gray-200 bg-gray-50/95 p-6 backdrop-blur-sm dark:border-gray-800 dark:bg-zinc-900/95">
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Specifications
                                </span>
                            </div>

                            {/* Real Monitor Columns */}
                            {monitors.map((monitor, index) => (
                                <div key={monitor.id} className={`sticky top-0 z-20 border-b border-l border-gray-200 p-6 transition-colors duration-300 ${index === 1 ? 'bg-gray-50/30 dark:bg-zinc-800/20' : 'bg-white dark:bg-zinc-900'} dark:border-gray-800`}>
                                    <div className="relative h-full flex flex-col">
                                        {index === 1 && (
                                            <div className="absolute -top-4 left-0 text-[10px] font-bold text-purple-500 uppercase tracking-tighter">
                                                Comparing preference
                                            </div>
                                        )}
                                        <div className="active-press absolute -right-2 -top-2 z-10">
                                            <button
                                                onClick={() => removeFromCompare(monitor.id)}
                                                className="rounded-full bg-gray-100 p-1.5 text-gray-500 transition-colors hover:bg-red-100 hover:text-red-600 dark:bg-zinc-800 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                                                title="Remove"
                                            >
                                                <X className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                        <div className="relative mb-3 aspect-video w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-zinc-800">
                                            <Image
                                                src={monitor.image}
                                                alt={monitor.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <Link href={`/monitor/${monitor.id}`} className="block hover:underline mb-2">
                                            <div className="h-[2.5rem] flex items-start">
                                                <h3 className="line-clamp-2 text-sm font-bold text-gray-900 dark:text-white">
                                                    {monitor.title}
                                                </h3>
                                            </div>
                                        </Link>
                                        <div className="mt-auto">
                                            <Link
                                                href={monitor.affiliateLink}
                                                className={`premium-button-card w-full py-2 text-xs ${index === 1 ? 'shadow-purple-500/20 filter brightness-110' : ''}`}
                                            >
                                                Buy on Amazon
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Placeholder Slot */}
                            {showPlaceholder && (
                                <button
                                    onClick={() => setIsPickerOpen(true)}
                                    aria-label="Add monitor to compare"
                                    className="sticky top-0 z-20 border-b border-l border-gray-200 bg-gray-50/10 p-6 dark:border-gray-800 dark:bg-zinc-800/10 group premium-add-slot focus-visible:ring-inset"
                                >
                                    <div className="flex h-full flex-col items-center justify-center text-center opacity-60 group-hover:opacity-100 transition-opacity">
                                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400 group-hover:border-purple-400 group-hover:text-purple-500 transition-colors">
                                            <Plus className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-xs font-bold text-gray-900 dark:text-white">
                                            Add monitor
                                        </h3>
                                    </div>
                                </button>
                            )}

                            {/* Spec Rows */}
                            {specs.map((spec) => (
                                <div key={spec.label} className="contents group">
                                    <div className="sticky left-0 z-20 col-span-1 flex items-center border-b border-gray-100 bg-gray-50/95 p-4 text-sm font-medium text-gray-500 backdrop-blur-sm dark:border-gray-800/50 dark:bg-zinc-900/95 dark:text-gray-400">
                                        {spec.label}
                                    </div>
                                    {monitors.map((monitor, index) => (
                                        <div key={`${monitor.id}-${spec.label}`} className={`flex items-center border-b border-l border-gray-100 p-4 text-sm font-semibold text-gray-900 dark:border-gray-800/50 ${index === 1 ? 'bg-gray-50/30 dark:bg-zinc-800/20' : 'bg-white dark:bg-zinc-900'} dark:text-white`}>
                                            {spec.getValue(monitor)}
                                        </div>
                                    ))}
                                    {showPlaceholder && (
                                        <div className="flex items-center border-b border-l border-gray-100 bg-gray-50/10 p-4 text-sm font-medium text-gray-300 dark:border-gray-800/50 dark:bg-zinc-800/5 dark:text-zinc-700">
                                            —
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {showPlaceholder && (
                            <div className="mt-8 flex justify-center">
                                <button
                                    onClick={() => setIsPickerOpen(true)}
                                    className="premium-button-primary px-8 py-3 text-sm"
                                >
                                    Add Another Monitor
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile View: Swipe Cards */}
            <div className="md:hidden space-y-8">
                <div className="relative flex rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-zinc-900 overflow-hidden">
                    {/* Fixed labels column */}
                    <div className="w-[110px] shrink-0 border-r border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 pt-[240px]">
                        {specs.map((spec) => (
                            <div key={spec.label} className="h-16 flex items-center px-4 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-100/50 dark:border-zinc-800/50">
                                {spec.label}
                            </div>
                        ))}
                    </div>

                    {/* Swipeable monitor area */}
                    <div
                        className="flex-1 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                        onScroll={handleMobileScroll}
                    >
                        <div className="flex" style={{ width: `${monitors.length * 100}%` }}>
                            {monitors.map((monitor, index) => (
                                <div key={monitor.id} className={`w-full shrink-0 snap-start p-4 transition-colors duration-300 ${index === 1 ? 'bg-gray-50/20 dark:bg-zinc-800/10' : ''}`}>
                                    <div className="relative mb-4">
                                        <div className="active-press absolute -right-1 -top-1 z-10">
                                            <button
                                                onClick={() => removeFromCompare(monitor.id)}
                                                className="rounded-full bg-gray-100 p-1.5 text-gray-500 dark:bg-zinc-800"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                        {index === 1 && (
                                            <div className="absolute -top-3.5 left-0 text-[9px] font-bold text-purple-500 uppercase tracking-tight">
                                                Comparing with
                                            </div>
                                        )}
                                        <div className={`relative mb-3 h-[140px] w-full overflow-hidden rounded-lg shadow-sm border border-gray-100 dark:border-zinc-800 flex items-center justify-center
                                            ${monitor.image.includes('placehold.co')
                                                ? 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-900/40 dark:to-zinc-900/60'
                                                : 'bg-gray-100 dark:bg-zinc-800'
                                            }
                                        `}>
                                            <Image
                                                src={monitor.image}
                                                alt={monitor.title}
                                                fill
                                                className={`object-cover ${monitor.image.includes('placehold.co') ? 'opacity-30 scale-90' : ''}`}
                                            />
                                        </div>
                                        <div className="h-[2.2rem] flex items-start mb-2.5">
                                            <h3 className="line-clamp-2 text-sm font-bold text-gray-900 dark:text-white leading-snug">
                                                {monitor.title}
                                            </h3>
                                        </div>
                                        <div className="flex justify-start">
                                            <Link
                                                href={monitor.affiliateLink}
                                                className={`premium-button-card w-fit px-5 py-2 text-[13px] font-bold !rounded-full ${index === 1 ? 'filter brightness-110 shadow-md shadow-purple-500/10' : ''}`}
                                            >
                                                Buy on Amazon
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="space-y-0">
                                        {specs.map((spec) => (
                                            <div key={spec.label} className="h-16 flex items-center text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-zinc-800 last:border-0 truncate">
                                                {spec.getValue(monitor)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile indicators */}
                {monitors.length > 1 && (
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex gap-1.5">
                            {monitors.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentMobileIndex ? 'w-4 bg-purple-500' : 'w-1.5 bg-gray-300 dark:bg-zinc-700'}`}
                                />
                            ))}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                            {currentMobileIndex + 1} of {monitors.length} monitors
                        </span>
                        <span className="text-[10px] text-gray-400 opacity-60">
                            Swipe left/right to compare
                        </span>
                    </div>
                )}

                {/* Mobile Add Monitor Section */}
                {showPlaceholder && (
                    <button
                        onClick={() => setIsPickerOpen(true)}
                        aria-label="Add another monitor to compare"
                        className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-8 dark:border-zinc-800 dark:bg-zinc-900/50 animate-fade-in-premium premium-add-slot group"
                    >
                        <div className="flex flex-col items-center text-center relative z-10 w-full">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800">
                                <Plus className="h-6 w-6 text-purple-500" />
                            </div>
                            <h3 className="text-base font-bold text-gray-900 dark:text-white">Add another monitor</h3>
                            <p className="mb-6 text-xs text-gray-500 dark:text-zinc-500 mt-1">Add up to 4 for comparison</p>

                            <div className="w-full space-y-4">
                                <div className="premium-button-primary w-full py-3 text-sm shadow-lg shadow-purple-500/10 block">
                                    Add monitor
                                </div>
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.push('/deals?mode=compare');
                                    }}
                                    className="block text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline"
                                >
                                    Browse deals
                                </div>
                            </div>
                        </div>
                    </button>
                )}
            </div>

            {/* Inline Picker Overlay */}
            <AddToComparePicker
                isOpen={isPickerOpen}
                onClose={() => setIsPickerOpen(false)}
                onSelect={(id) => {
                    addToCompare(id);
                    setIsPickerOpen(false);
                }}
                alreadySelectedIds={compareIds}
            />
        </div>
    );
}

export default function ComparePage() {
    return (
        <Suspense fallback={<div className="p-12 text-center">Loading comparison...</div>}>
            <CompareContent />
        </Suspense>
    );
}
