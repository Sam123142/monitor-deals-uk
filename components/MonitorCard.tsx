import Image from 'next/image';
import Link from 'next/link';
import { Monitor } from '@/lib/mockData';

interface MonitorCardProps {
    monitor: Monitor;
}

export default function MonitorCard({ monitor }: MonitorCardProps) {
    const discount = Math.round(((monitor.originalPrice - monitor.price) / monitor.originalPrice) * 100);

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-zinc-900">
            <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
                <Image
                    src={monitor.image}
                    alt={monitor.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {discount > 0 && (
                    <div className="absolute left-2 top-2 rounded-md bg-red-600 px-2 py-1 text-xs font-bold text-white shadow-sm">
                        -{discount}%
                    </div>
                )}
            </div>
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 text-xs font-medium text-blue-600 dark:text-blue-400">
                    {monitor.specs.brand}
                </div>
                <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                    {monitor.title}
                </h3>
                <div className="mb-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-zinc-800 dark:text-gray-400">
                        {monitor.specs.resolution}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-zinc-800 dark:text-gray-400">
                        {monitor.specs.refreshRate}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-zinc-800 dark:text-gray-400">
                        {monitor.specs.size}
                    </span>
                </div>
                <div className="mt-auto flex items-center justify-between">
                    <div>
                        <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                            Last updated: {monitor.lastUpdated}
                        </div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                            £{monitor.price.toFixed(2)}
                        </div>
                        {monitor.originalPrice > monitor.price && (
                            <div className="text-sm text-gray-500 line-through dark:text-gray-500">
                                £{monitor.originalPrice.toFixed(2)}
                            </div>
                        )}
                    </div>
                    <Link
                        href={`/monitor/${monitor.id}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
                    >
                        View Deal
                    </Link>
                </div>
            </div>
        </div>
    );
}
