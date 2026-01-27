import { mockMonitors } from "@/lib/mockData";
import MonitorCard from "@/components/MonitorCard";
import Link from 'next/link';
import { ArrowRight, RefreshCcw } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-white dark:bg-black">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20" />
                <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                            Top Gaming Monitor Deals in the UK
                        </h1>
                        <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
                            We highlight the latest gaming monitor deals from Amazon UK to help you find the perfect display for your setup. No markup, just great deals, updated regularly. Prices may change.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/deals"
                                className="inline-flex items-center rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg dark:hover:shadow-blue-900/30"
                            >
                                Browse All Deals
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                            <div className="flex items-center gap-2 rounded-full bg-gray-100 px-6 py-3 text-sm font-medium text-gray-600 dark:bg-zinc-800 dark:text-gray-300">
                                <RefreshCcw className="h-4 w-4 animate-spin-slow text-green-600" />
                                Prices Updated Regularly
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Deals */}
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-end justify-between">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Deals</h2>
                    <Link href="/deals" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                        View All &rarr;
                    </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {mockMonitors.slice(0, 8).map((monitor) => (
                        <MonitorCard key={monitor.id} monitor={monitor} />
                    ))}
                </div>
            </div>
        </div>
    );
}
