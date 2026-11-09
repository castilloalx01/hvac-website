import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { business } from "@/lib/business";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: `${business.name} | Heating & Cooling Services`,
        template: `%s | ${business.name}`,
    },
    description:
        "Maintenance, quotes, diagnostics and installations. Book your appointment online.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        // suppressHydrationWarning: browser extensions add attributes to <html> before React loads.
        // It only applies to this tag's own attributes, so real mismatches elsewhere still warn.
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
            suppressHydrationWarning
        >
            <body className="min-h-full flex flex-col">
                {/* Without JavaScript the scroll reveals can't run, so keep content visible */}
                <noscript>
                    <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
                </noscript>
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
