'use client';

import { useState, useEffect } from "react";
import { mockMonitors } from "@/lib/mockData";
import MonitorCard from "@/components/MonitorCard";
import { MonitorGridSkeleton } from "@/components/MonitorCardSkeleton";
import Link from 'next/link';
import { ArrowRight, RefreshCcw } from 'lucide-react';

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-white dark:bg-black">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-fuchsia-500/10 dark:from-purple-500/20 dark:via-violet-500/20 dark:to-fuchsia-500/20" />
                <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 lg:px-8 lg:pt-32 lg:pb-16">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="animate-hero-headline mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                            Top Gaming Monitor Deals in the UK
                        </h1>
                        <p className="animate-hero-description mb-8 text-lg text-gray-600 dark:text-gray-300">
                            We highlight the latest gaming monitor deals from Amazon UK to help you find the perfect display for your setup. No markup, just great deals, updated regularly. Prices may change.
                        </p>
                        <div className="animate-hero-buttons flex flex-wrap justify-center gap-4">
                            <Link
                                href="/deals"
                                className="premium-button-primary"
                            >
                                Browse All Deals
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                            <div className="secondary-status-pill">
                                <RefreshCcw className="h-4 w-4 animate-spin-slow text-green-600" />
                                Prices Updated Regularly
                            </div>
                        </div>
                        <p className="animate-hero-buttons mt-6 text-xs font-medium text-gray-500 dark:text-zinc-400">
                            Updated regularly • UK pricing • No price markup
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Deals */}
            <div className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-end justify-between">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Deals</h2>
                    <Link
                        href="/deals"
                        className="premium-link px-2 py-1 text-sm font-medium text-gray-600 dark:text-gray-400"
                    >
                        View All &rarr;
                    </Link>
                </div>

                <div className="relative">
                    {isLoading ? (
                        <div className="absolute inset-0 z-10 bg-white dark:bg-black transition-opacity duration-300">
                            <MonitorGridSkeleton count={8} />
                        </div>
                    ) : null}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {mockMonitors.slice(0, 8).map((monitor, index) => (
                            <div
                                key={monitor.id}
                                className={`${isLoading ? 'opacity-0' : 'animate-card-entrance'}`}
                                style={{ animationDelay: isLoading ? '0ms' : `${index * 50}ms` }}
                            >
                                <MonitorCard monitor={monitor} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
