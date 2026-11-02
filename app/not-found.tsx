import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Page not found",
};

export default function NotFound() {
    return (
        <section className="mx-auto max-w-2xl px-4 py-24 text-center">
            <p className="text-sm font-semibold text-red-700">404</p>
            <h1 className="mt-2 text-3xl font-bold text-neutral-900">Page not found</h1>
            <p className="mt-3 text-neutral-600">
                Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                    href="/"
                    className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700"
                >
                    Back to home
                </Link>
                <Link
                    href="/book"
                    className="rounded-lg border border-neutral-300 px-5 py-2.5 font-semibold text-neutral-700 hover:bg-neutral-50"
                >
                    Book an appointment
                </Link>
            </div>
        </section>
    );
}
