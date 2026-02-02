'use client';

import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';
import { mockMonitors } from '@/lib/mockData';
import MonitorCard from "@/components/MonitorCard";
import { MonitorGridSkeleton } from "@/components/MonitorCardSkeleton";
import { ChevronLeft, Check, Shield, Truck } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';

interface Props {
    params: {
        id: string;
    };
}

export default function MonitorDetailsPage({ params }: Props) {
    const { addToCompare } = useCompare();
    const [isLoading, setIsLoading] = useState(true);
    const monitor = mockMonitors.find((m) => m.id === params.id);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 600);
        return () => clearTimeout(timer);
    }, [params.id]);

    if (!monitor) {
        notFound();
    }

    const similarMonitors = mockMonitors
        .filter(m =>
            m.id !== params.id &&
            (m.specs.resolution === monitor.specs.resolution || m.specs.refreshRate === monitor.specs.refreshRate)
        )
        .slice(0, 4);

    const discount = Math.round(((monitor.originalPrice - monitor.price) / monitor.originalPrice) * 100);

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <Link
                href="/"
                className="premium-link group focus-ring mb-12 inline-flex items-center gap-2 rounded-lg py-2 text-[0.9375rem] font-bold text-gray-600 dark:text-gray-400"
            >
                <ChevronLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1 group-focus-visible:-translate-x-1" />
                <span>Back to Deals</span>
            </Link>

            <div className="grid gap-12 lg:grid-cols-2">
                {/* Image Section */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-800">
                    <Image
                        src={monitor.image}
                        alt={monitor.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    {discount > 0 && (
                        <div className="absolute left-4 top-4 rounded-lg bg-red-600 px-3 py-1.5 text-sm font-bold text-white shadow-lg">
                            Save {discount}%
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div>
                    <div className="secondary-status-pill mb-4 px-3 py-1">
                        {monitor.specs.brand}
                    </div>
                    <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
                        {monitor.title}
                    </h1>


                    <div className="mb-6">
                        <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            Last updated: {monitor.lastUpdated}
                        </div>
                        <div className="flex flex-col gap-1">
                            {monitor.originalPrice > monitor.price && (
                                <span className="text-xl text-gray-500 line-through dark:text-zinc-400">
                                    £{monitor.originalPrice.toFixed(2)}
                                </span>
                            )}
                            <div className="text-4xl font-bold text-gray-900 dark:text-white">
                                £{monitor.price.toFixed(2)}
                            </div>
                        </div>

                        <div className="mt-4 mb-8 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-zinc-900/50">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                Key Specifications
                            </h3>
                            <dl className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Resolution</dt>
                                    <dd className="mt-1 text-base font-semibold text-gray-900 dark:text-white">{monitor.specs.resolution}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Refresh Rate</dt>
                                    <dd className="mt-1 text-base font-semibold text-gray-900 dark:text-white">{monitor.specs.refreshRate}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Screen Size</dt>
                                    <dd className="mt-1 text-base font-semibold text-gray-900 dark:text-white">{monitor.specs.size}</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="mb-8 space-y-3">
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                <Check className="h-5 w-5 text-green-500" />
                                <span>In stock on Amazon UK</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                <Shield className="h-5 w-5 text-gray-400" />
                                <span>2 Year Manufacturer Warranty</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                <Truck className="h-5 w-5 text-gray-400" />
                                <span>Free 2-Day Delivery</span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Link
                                href={monitor.affiliateLink}
                                className="premium-button-primary flex-1 text-lg min-h-[52px] flex items-center justify-center text-center"
                            >
                                <span className="sm:hidden">Buy on Amazon</span>
                                <span className="hidden sm:inline">Buy now on Amazon UK</span>
                            </Link>
                            <button
                                onClick={() => addToCompare(monitor.id)}
                                className="active-press min-h-[52px] flex items-center justify-center rounded-xl border-2 border-gray-200 px-6 font-bold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-zinc-800"
                                title="Compare with another monitor"
                            >
                                Compare
                            </button>
                        </div>
                        <p className="mt-4 text-center text-xs text-gray-500">
                            * We earn a commission if you make a purchase, at no additional cost to you.
                        </p>
                    </div>
                </div>
            </div>

            {similarMonitors.length > 0 && (
                <div className="mt-24 border-t border-gray-200 pt-12 dark:border-gray-800">
                    <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
                        You Might Also Like
                    </h2>
                    <div className="relative">
                        {isLoading ? (
                            <div className="absolute inset-0 z-10 bg-white dark:bg-black transition-opacity duration-300">
                                <MonitorGridSkeleton count={4} />
                            </div>
                        ) : null}
                        <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${isLoading ? 'opacity-0' : 'animate-fade-in-premium'}`}>
                            {similarMonitors.map((m) => (
                                <MonitorCard key={m.id} monitor={m} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
