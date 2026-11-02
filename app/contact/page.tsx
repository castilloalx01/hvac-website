import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { business, formatPhone } from "@/lib/business";

export const metadata: Metadata = {
    title: "Contact",
    description: `Call, email, or message ${business.name}. See our service area and business hours.`,
};

export default function ContactPage() {
    const details = [
        {
            label: "Phone",
            value: (
                <a
                    href={`tel:${business.phone}`}
                    className="text-red-700 hover:underline"
                >
                    {formatPhone(business.phone)}
                </a>
            ),
        },
        {
            label: "Email",
            value: (
                <a
                    href={`mailto:${business.email}`}
                    className="text-red-700 hover:underline"
                >
                    {business.email}
                </a>
            ),
        },
        { label: "Hours", value: business.hours },
        { label: "Service area", value: business.serviceArea },
    ];

    return (
        <section className="mx-auto max-w-6xl px-4 py-12">
            <h1 className="text-3xl font-bold text-neutral-900">Contact us</h1>
            <p className="mt-2 text-neutral-600">
                Questions about a repair or a new system? Give us a call, send a
                message, or{" "}
                <Link
                    href="/book"
                    className="font-medium text-red-700 hover:underline"
                >
                    book an appointment online
                </Link>
                .
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
                <dl className="grid content-start gap-4 sm:grid-cols-2 md:grid-cols-1">
                    {details.map((d) => (
                        <div
                            key={d.label}
                            className="rounded-xl bg-neutral-50 p-5"
                        >
                            <dt className="text-sm font-medium text-neutral-600">
                                {d.label}
                            </dt>
                            <dd className="mt-1 text-lg text-neutral-900">
                                {d.value}
                            </dd>
                        </div>
                    ))}
                </dl>
                <ContactForm />
            </div>
        </section>
    );
}
