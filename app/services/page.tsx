import type { Metadata } from "next";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";

export const metadata: Metadata = {
    title: "Services",
    description:
        "HVAC maintenance, free quotes, diagnostics, and installations. Book any service online.",
};

export default function ServicesPage() {
    return (
        <section className="mx-auto max-w-6xl px-4 py-12">
            <h1 className="text-3xl font-bold text-neutral-900">Our Services</h1>
            <p className="mt-2 text-neutral-600">
                Choose a service and book your appointment online.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {services.map((s) => (
                    <ServiceCard
                        key={s.id}
                        service={s}
                        eager
                        headingLevel="h2"
                    />
                ))}
            </div>
        </section>
    );
}
