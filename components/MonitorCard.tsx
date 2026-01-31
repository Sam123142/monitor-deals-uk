import Image from 'next/image';
import Link from 'next/link';
import { Monitor } from '@/lib/mockData';
import { Scale } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';

interface MonitorCardProps {
    monitor: Monitor;
}

export default function MonitorCard({ monitor }: MonitorCardProps) {
    const { addToCompare } = useCompare();
    const discount = Math.round(((monitor.originalPrice - monitor.price) / monitor.originalPrice) * 100);

    return (
        <Link
            href={`/monitor/${monitor.id}`}
            className="active-press group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 ease-out md:hover:-translate-y-1 md:focus-visible:-translate-y-1 md:hover:shadow-xl md:hover:shadow-purple-500/5 dark:border-gray-800 dark:bg-zinc-900 dark:md:hover:shadow-purple-900/5"
        >
            <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
                <Image
                    src={monitor.image}
                    alt={monitor.title}
                    fill
                    className="object-cover transition-transform duration-300 ease-out md:group-hover:scale-[1.05]"
                />
                {discount > 0 && (
                    <div className="absolute left-2 top-2 z-10 rounded-md bg-red-600 px-2 py-1 text-xs font-bold text-white shadow-sm">
                        -{discount}%
                    </div>
                )}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        addToCompare(monitor.id);
                    }}
                    className="absolute right-2 top-2 z-20 rounded-full bg-white/90 p-1.5 text-gray-600 shadow-sm transition-all hover:bg-white hover:text-purple-600 hover:shadow opacity-100 md:opacity-0 md:group-hover:opacity-100 dark:bg-black/90 dark:text-gray-300 dark:hover:bg-black dark:hover:text-purple-400"
                    title="Compare"
                >
                    <Scale className="h-4 w-4" />
                </button>
            </div>
            <div className="flex flex-1 flex-col p-4 pb-5">
                <div className="mb-2 text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-tight">
                    {monitor.specs.brand}
                </div>

                {/* Fixed height for title area */}
                <div className="h-[3.75rem] mb-2">
                    <h3 className="line-clamp-2 text-[1.125rem] leading-tight font-bold text-gray-900 dark:text-gray-100">
                        {monitor.title}
                    </h3>
                </div>

                {/* Fixed height for specs area */}
                <div className="h-[4.25rem] mb-4 flex flex-wrap gap-2 content-start overflow-hidden">
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

                <div className="mt-auto border-t border-gray-100 pt-5 dark:border-gray-800 flex items-end justify-between">
                    <div className="flex flex-col">
                        <div className="mb-1 flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-gray-400 uppercase font-black tracking-wider">
                            {['Just now', '1 hour ago', '2 hours ago'].includes(monitor.lastUpdated) && (
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-live-pulse absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                                </span>
                            )}
                            Updated {monitor.lastUpdated}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <div className="h-4">
                                {monitor.originalPrice > monitor.price ? (
                                    <span className="text-sm text-gray-500 line-through dark:text-zinc-400 font-medium">
                                        £{monitor.originalPrice.toFixed(2)}
                                    </span>
                                ) : (
                                    <span className="text-sm opacity-0 select-none">£0.00</span>
                                )}
                            </div>
                            <div className="text-[1.5rem] font-black text-gray-900 dark:text-white leading-none tracking-tight">
                                £{monitor.price.toFixed(2)}
                            </div>
                        </div>
                    </div>
                    <div
                        className="premium-button-card flex-col !px-4 !py-1 !h-[3.25rem] !min-w-[6.5rem] leading-tight text-[0.85rem]"
                    >
                        <span>Buy on</span>
                        <span>Amazon</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
