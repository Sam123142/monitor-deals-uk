import LegalPage from '@/components/LegalPage';
import Link from 'next/link';

export default function HowWeChooseDeals() {
    return (
        <LegalPage title="How We Choose Deals" lastUpdated="January 31, 2026">
            <section className="space-y-4">
                <p>
                    Our goal is to surface the best gaming monitor deals with clear specifications, helping you make an informed decision without the noise.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Our Selection Process</h2>
                <p>
                    We track thousands of monitor prices regularly. Our selection is driven by several key metrics:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Discount Size:</strong> We prioritise significant price drops compared to the recent historical average.</li>
                    <li><strong>Performance Specs:</strong> We focus on popular gaming specs, including high refresh rates (144Hz+), resolution (1440p/4K), and panel quality (OLED/IPS).</li>
                    <li><strong>Availability:</strong> We only show deals that are currently in stock at trusted retailers.</li>
                    <li><strong>Recency:</strong> New deals are prioritised to ensure you don't miss out on limited-time offers.</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Automation & Accuracy</h2>
                <p>
                    To stay competitive, we use automated systems to monitor prices and update deals regularly.
                    While automation allows us to be fast, it can occasionally lead to errors if a retailer's data is feed incorrectly.
                    We encourage users to always <strong>verify the final price on the retailer's site</strong> before purchasing.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Editorial Neutrality</h2>
                <p>
                    We do not accept payment to rank specific monitors higher in our lists. Our rankings are based on the criteria mentioned above.
                    While we may use <Link href="/affiliate-disclosure" className="text-purple-600 dark:text-purple-400 hover:underline">affiliate links</Link>, these do not change the price you pay and do not influence which monitors we choose to feature.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">What is a "Deal"?</h2>
                <p>
                    A "deal" isn't just a low price; it's value. We look for monitors that are currently at or near their lowest ever price,
                    or that offer exceptional performance for their current price bracket.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Feedback</h2>
                <p>
                    If you have questions about MonitorDeals, please check this page again for updates.
                </p>
            </section>
        </LegalPage>
    );
}
