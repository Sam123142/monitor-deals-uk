export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-zinc-900/50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        &copy; {new Date().getFullYear()} MonitorDeals. All rights reserved.
                    </p>
                    <div className="max-w-md text-center text-xs text-gray-400 md:text-right">
                        <p>
                            MonitorDeals is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
