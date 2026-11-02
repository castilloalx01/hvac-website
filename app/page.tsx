import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { business, formatPhone } from "@/lib/business";

// Placeholder copy: easy to edit for the client
const reasons = [
    {
        title: "Licensed & insured",
        text: "Certified technicians and full insurance on every job, big or small.",
        icon: "M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z M9 12l2 2 4-4",
    },
    {
        title: "Same-day service",
        text: "Call before noon and we'll do our best to be there the same day.",
        icon: "M12 7v5l3 2 M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
        title: "Upfront pricing",
        text: "You approve the price before we start. No surprises on the bill.",
        icon: "M7 7h.01 M3 12V4a1 1 0 011-1h8l9 9-9 9-9-9z",
    },
    {
        title: "Work guaranteed",
        text: "Every repair and installation is backed by our workmanship warranty.",
        icon: "M9 12l2 2 4-4 M12 2l2.4 2.1 3.2-.3.7 3.1 2.8 1.6-1.3 2.9 1.3 2.9-2.8 1.6-.7 3.1-3.2-.3L12 22l-2.4-2.1-3.2.3-.7-3.1-2.8-1.6 1.3-2.9-1.3-2.9 2.8-1.6.7-3.1 3.2.3L12 2z",
    },
];

export default function Home() {
    const phone = formatPhone(business.phone);

    return (
        <>
            <section className="bg-neutral-950 text-white">
                <div className="mx-auto max-w-6xl px-4 py-20 text-center">
                    <h1 className="text-4xl font-bold sm:text-5xl">
                        Comfort you can count on, all year round
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-300">
                        Reliable heating and cooling services. Book your
                        appointment online in minutes.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/book"
                            className="rounded-lg bg-yellow-400 text-black px-6 py-3 font-semibold hover:bg-yellow-300"
                        >
                            Book an appointment
                        </Link>
                        <Link
                            href="/services"
                            className="rounded-lg bg-white px-6 py-3 font-semibold text-black hover:bg-neutral-200"
                        >
                            View services
                        </Link>
                    </div>
                </div>
            </section>

            <section aria-label="Emergency service" className="bg-red-700">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 px-4 py-4 text-center sm:flex-row sm:gap-4">
                    <p className="font-medium text-white">
                        No heat or no AC? Same-day emergency service available.
                    </p>
                    <a
                        href={`tel:${business.phone}`}
                        className="font-bold text-white underline-offset-4 hover:underline"
                    >
                        Call {phone}
                    </a>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 py-16">
                <h2 className="text-2xl font-bold text-neutral-900">
                    What we do
                </h2>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((s) => (
                        <ServiceCard key={s.id} service={s} />
                    ))}
                </div>
            </section>

            <section className="bg-neutral-50">
                <div className="mx-auto max-w-6xl px-4 py-16">
                    <h2 className="text-2xl font-bold text-neutral-900">
                        Why choose {business.name}
                    </h2>
                    <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {reasons.map((r) => (
                            <li
                                key={r.title}
                                className="rounded-xl bg-white p-6 shadow-sm"
                            >
                                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-700">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={1.8}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path d={r.icon} />
                                    </svg>
                                </span>
                                <h3 className="mt-4 font-semibold text-neutral-900">
                                    {r.title}
                                </h3>
                                <p className="mt-1 text-sm text-neutral-600">
                                    {r.text}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 py-16">
                <h2 className="text-2xl font-bold text-neutral-900">
                    What our customers say
                </h2>
                <ul className="mt-8 grid gap-6 md:grid-cols-3">
                    {testimonials.map((t) => (
                        <li key={t.name}>
                            <figure className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                                <p
                                    className="text-yellow-500"
                                    aria-label="5 out of 5 stars"
                                >
                                    ★★★★★
                                </p>
                                <blockquote className="mt-3 flex-1 text-neutral-700">
                                    “{t.quote}”
                                </blockquote>
                                <figcaption className="mt-4 text-sm font-semibold text-neutral-900">
                                    {t.name}
                                    <span className="font-normal text-neutral-600">
                                        {" "}
                                        · {t.location}
                                    </span>
                                </figcaption>
                            </figure>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="bg-red-700 text-white">
                <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:items-center">
                    <div>
                        <h2 className="text-2xl font-bold">
                            Service area and hours
                        </h2>
                        <dl className="mt-6 space-y-4">
                            <div>
                                <dt className="text-sm font-medium text-red-100">
                                    Where we work
                                </dt>
                                <dd className="text-lg">
                                    {business.serviceArea}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-red-100">
                                    When we&apos;re open
                                </dt>
                                <dd className="text-lg">{business.hours}</dd>
                            </div>
                        </dl>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                        <Link
                            href="/book"
                            className="rounded-lg bg-yellow-400 text-black px-6 py-3 text-center font-semibold hover:bg-yellow-300"
                        >
                            Book an appointment
                        </Link>
                        <a
                            href={`tel:${business.phone}`}
                            className="rounded-lg bg-white px-6 py-3 text-center font-semibold text-black hover:bg-neutral-200"
                        >
                            Call {phone}
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
