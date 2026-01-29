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
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20" />
                <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 lg:px-8 lg:pt-32 lg:pb-16">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="animate-fade-up mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                            Top Gaming Monitor Deals in the UK
                        </h1>
                        <p className="animate-fade-up delay-100 mb-8 text-lg text-gray-600 dark:text-gray-300">
                            We highlight the latest gaming monitor deals from Amazon UK to help you find the perfect display for your setup. No markup, just great deals, updated regularly. Prices may change.
                        </p>
                        <div className="animate-fade-up delay-200 flex flex-wrap justify-center gap-4">
                            <Link
                                href="/deals"
                                className="active-press inline-flex items-center rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-xl shadow-blue-500/10 transition-all duration-200 hover:bg-blue-700 lg:hover:-translate-y-[2px] lg:hover:shadow-[0_8px_25px_-5px_rgba(59,130,246,0.4)]"
                            >
                                Browse All Deals
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                            <div className="flex items-center gap-2 rounded-full bg-gray-100 px-6 py-3 text-sm font-medium text-gray-600 dark:bg-zinc-800 dark:text-gray-300">
                                <RefreshCcw className="h-4 w-4 animate-spin-slow text-green-600" />
                                Prices Updated Regularly
                            </div>
                        </div>
                        <p className="animate-fade-up delay-200 mt-6 text-xs font-medium text-gray-500 dark:text-zinc-400">
                            Updated regularly • UK pricing • Affiliate links
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
                        className="rounded-lg px-2 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 md:text-blue-500 md:dark:text-blue-300 hover:underline focus-visible:underline underline-offset-4 transition-all duration-200"
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
