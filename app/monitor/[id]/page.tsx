import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { mockMonitors } from '@/lib/mockData';
import MonitorCard from "@/components/MonitorCard";
import { ChevronLeft, Check, Shield, Truck } from 'lucide-react';

interface Props {
    params: {
        id: string;
    };
}

export default function MonitorDetailsPage({ params }: Props) {
    const monitor = mockMonitors.find((m) => m.id === params.id);

    if (!monitor) {
        notFound();
    }

    const similarMonitors = mockMonitors
        .filter(m =>
            m.id !== params.id &&
            (m.specs.resolution === monitor.specs.resolution || m.specs.refreshRate === monitor.specs.refreshRate)
        )
        .slice(0, 3);

    const discount = Math.round(((monitor.originalPrice - monitor.price) / monitor.originalPrice) * 100);

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <Link
                href="/"
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
                <ChevronLeft className="h-4 w-4" />
                Back to Deals
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
                    <div className="mb-2 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        {monitor.specs.brand}
                    </div>
                    <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
                        {monitor.title}
                    </h1>


                    <div className="mb-6">
                        <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            Last updated: {monitor.lastUpdated}
                        </div>
                        <div className="flex items-baseline gap-4">
                            <span className="text-4xl font-bold text-gray-900 dark:text-white">
                                £{monitor.price.toFixed(2)}
                            </span>
                            {monitor.originalPrice > monitor.price && (
                                <span className="text-xl text-gray-500 line-through dark:text-gray-500">
                                    £{monitor.originalPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        <div className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-zinc-900/50">
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
                                <span>In Stock at {monitor.retailer}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                <Shield className="h-5 w-5 text-blue-500" />
                                <span>2 Year Manufacturer Warranty</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                <Truck className="h-5 w-5 text-blue-500" />
                                <span>Free 2-Day Shipping</span>
                            </div>
                        </div>

                        <Link
                            href={monitor.affiliateLink}
                            className="block w-full rounded-xl bg-blue-600 px-8 py-4 text-center text-lg font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
                        >
                            Buy Now from {monitor.retailer}
                        </Link>
                        <p className="mt-4 text-center text-xs text-gray-500">
                            * We earn a commission if you make a purchase, at no additional cost to you.
                        </p>
                    </div>
                </div>

                {similarMonitors.length > 0 && (
                    <div className="mt-24 border-t border-gray-200 pt-12 dark:border-gray-800">
                        <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
                            You Might Also Like
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {similarMonitors.map((m) => (
                                <MonitorCard key={m.id} monitor={m} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
