import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";

export default function ServicesPage() {
    return (
        <section className="mx-auto max-w-6xl px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-900">Our Services</h1>
            <p className="mt-2 text-gray-600">
                Choose a service and book your appointment online.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {services.map((s) => (
                    <ServiceCard key={s.id} service={s} />
                ))}
            </div>
        </section>
    );
}
