import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";

export default function Home() {
    return (
        <>
            <section className="bg-gradient-to-br from-blue-700 to-blue-500 text-white">
                <div className="mx-auto max-w-6xl px-4 py-20 text-center">
                    <h1 className="text-4xl font-bold sm:text-5xl">
                        Comfort you can count on, all year round
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
                        Reliable heating and cooling services. Book your
                        appointment online in minutes.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/book"
                            className="rounded-lg bg-orange-500 px-6 py-3 font-semibold hover:bg-orange-600"
                        >
                            Book an appointment
                        </Link>
                        <Link
                            href="/services"
                            className="rounded-lg border border-white px-6 py-3 font-semibold hover:bg-white/10"
                        >
                            View services
                        </Link>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 py-16">
                <h2 className="text-2xl font-bold text-gray-900">What we do</h2>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((s) => (
                        <ServiceCard key={s.id} service={s} />
                    ))}
                </div>
            </section>
        </>
    );
}
