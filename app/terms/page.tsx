import LegalPage from '@/components/LegalPage';

export default function TermsOfService() {
    return (
        <LegalPage title="Terms of Service" lastUpdated="January 31, 2026">
            <section className="space-y-4">
                <p>
                    By using MonitorDeals, you agree to comply with and be bound by the following terms and conditions.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Use at Your Own Risk</h2>
                <p>
                    The information provided on MonitorDeals is for general informational purposes only. While we strive for accuracy,
                    we do not guarantee the correctness, completeness, or timeliness of any deal, price, or specification.
                    Use of the information on this site is at your own risk.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Retailer Changes and Liability</h2>
                <p>
                    We have no control over the products, prices, or policies of the retailers we link to.
                    We are not liable for any issues arising from your interaction with these third-party websites,
                    including but not limited to incorrect pricing, out-of-stock items, or shipping delays.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Intellectual Property</h2>
                <p>
                    The content, design, and logo of MonitorDeals are our property and are protected by intellectual property laws.
                    Product images and trademarks belong to their respective owners (e.g., Samsung, LG, Amazon).
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Acceptable Use</h2>
                <p>
                    You agree not to use this site for any unlawful purpose or in any way that could damage, disable, or overburden the site.
                    Automated scraping of our content is prohibited without prior written consent.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Governing Law</h2>
                <p>
                    These terms are governed by and construed in accordance with the laws of the United Kingdom.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Changes to Terms</h2>
                <p>
                    We reserve the right to modify these terms at any time. Continued use of the site after changes are posted constitutes acceptance of the new terms.
                </p>
            </section>
        </LegalPage>
    );
}
