import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { CompareProvider } from "@/context/CompareContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Monitor Deals - Find the Best Gaming Monitors",
    description: "Curated list of the best gaming monitor deals updated daily.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
            <body className={inter.className}>
                <CompareProvider>
                    <div className="flex min-h-screen flex-col">
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                        <BackToTop />
                    </div>
                </CompareProvider>
            </body>
        </html>
    );
}
