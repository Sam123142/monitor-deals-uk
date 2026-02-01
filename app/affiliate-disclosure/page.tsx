import LegalPage from '@/components/LegalPage';

export default function AffiliateDisclosure() {
    return (
        <LegalPage title="Affiliate Disclosure" lastUpdated="January 31, 2026">
            <section className="space-y-4">
                <p>
                    Quality research and server maintenance for MonitorDeals are supported by our readers.
                    When you purchase a monitor through links on our site, we may earn an affiliate commission.
                </p>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">How it works</h2>
                <p>
                    We participate in various affiliate marketing programmes, which means we may get paid commissions on products purchased through our links to retailer sites (such as Amazon, Currys, Overclockers, and others).
                </p>
                <p>
                    This comes at <strong>no additional cost to you</strong>. The price you pay is the same whether you use our affiliate link or go directly to the retailer's website.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Amazon Associates Programme</h2>
                <p>
                    MonitorDeals is a participant in the Amazon Services LLC Associates Programme, an affiliate advertising programme designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.co.uk and affiliated sites.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Prices and Availability</h2>
                <p>
                    We do our best to keep all information up to date, but prices and availability of products can change frequently.
                    All monitor prices, specifications, and availability should be confirmed on the retailer's site before making a purchase.
                    Product images and titles are provided by the retailers and are used for identification purposes.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Our Commitment</h2>
                <p>
                    Our editorial integrity is our top priority. We choose monitor deals based on their value, specifications, and historical price data, not based on the commission rate.
                    The presence of an affiliate link does not influence our recommendation of a product.
                </p>
            </section>
        </LegalPage>
    );
}
