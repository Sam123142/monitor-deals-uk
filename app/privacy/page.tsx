import LegalPage from '@/components/LegalPage';

export default function PrivacyPolicy() {
    return (
        <LegalPage title="Privacy Policy" lastUpdated="January 31, 2026">
            <section className="space-y-4">
                <p>
                    Your privacy is important to us. This Privacy Policy explains what information we collect when you use MonitorDeals and how we use it.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Information We Collect</h2>
                <p>
                    We collect minimal personal information. When you visit our site, we may automatically collect:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Basic analytics (e.g., pages visited, time spent on site)</li>
                    <li>Device information (e.g., browser type, operating system)</li>
                    <li>Referrer information (how you found our site)</li>
                </ul>
                <p>
                    We do not require you to create an account or provide your name or email address to browse monitor deals.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Cookies</h2>
                <p>
                    We use cookies and similar tracking technologies to enhance your experience and analyse site traffic.
                    Cookies are small files stored on your device. You can choose to disable cookies through your browser settings,
                    though some site features may not function as intended.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Third-Party Services</h2>
                <p>
                    We use third-party services for hosting and analytics (such as Vercel and Google Analytics).
                    These services may process your data according to their own privacy policies.
                    When you click on a retailer's link, they will use their own cookies to track your purchase for affiliate purposes.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Data Security and Selling</h2>
                <p>
                    We do not sell, trade, or otherwise transfer your personal information to outside parties.
                    We implement standard security measures to protect the information we collect.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Rights</h2>
                <p>
                    You have the right to request access to or deletion of any data we may have collected about you.
                    Since we do not store personal profiles, this typically refers to clearing your browser cookies.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Children's Privacy</h2>
                <p>
                    Our website is not intended for children under 13. We do not knowingly collect information from children.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Changes to this Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. We will indicate the "Last updated" date at the top of this page.
                </p>
            </section>
        </LegalPage>
    );
}
