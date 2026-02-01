import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-zinc-900/50">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
                            MonitorDeals
                        </Link>
                        <p className="max-w-xs text-sm text-gray-500 dark:text-gray-400">
                            Find the best gaming monitor deals updated daily. We track prices across top retailers to save you time and money.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">Legal & Trust</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link href="/affiliate-disclosure" className="text-sm text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400">
                                    Affiliate Disclosure
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-sm text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-sm text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/how-we-choose-deals" className="text-sm text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400">
                                    How We Choose Deals
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            &copy; {new Date().getFullYear()} MonitorDeals. All rights reserved.
                        </p>
                        <div className="max-w-md text-center text-[10px] leading-relaxed text-gray-400 md:text-right">
                            <p>
                                MonitorDeals may earn a small commission when you purchase through our links, at no extra cost to you.
                                We are a participant in the Amazon Services LLC Associates Programme, an affiliate advertising programme designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.co.uk.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
