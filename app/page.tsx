import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import Reveal from "@/components/Reveal";
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

// A few photos from the gallery, shown gently floating on the home page
const floatingPhotos = [
    {
        src: "/images/gallery/installations-heat-pump-modern-home.webp",
        alt: "Heat pump installed outside a modern home",
        float: "animate-gallery-float-a",
        offset: "",
    },
    {
        src: "/images/gallery/maintenance-rooftop-gauges.webp",
        alt: "Technician checking refrigerant pressure on a rooftop condenser",
        float: "animate-gallery-float-b",
        offset: "sm:mt-10",
    },
    {
        src: "/images/gallery/diagnostics-smart-thermostat.webp",
        alt: "Smart thermostat mounted on a wall",
        float: "animate-gallery-float-a",
        offset: "",
    },
];

// Arrow that slides right when the parent link (which needs the "group" class) is hovered
function Arrow() {
    return (
        <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover:translate-x-1.5"
        >
            →
        </span>
    );
}

export default function Home() {
    const phone = formatPhone(business.phone);

    return (
        <>
            {/* Hero + emergency bar together fill the screen below the sticky navbar (~4rem tall) */}
            <div className="flex min-h-[calc(100svh-4rem)] flex-col">
                <section className="relative flex flex-1 items-center overflow-hidden bg-neutral-950 text-white">
                    {/* Background photo that slowly zooms and drifts (Ken Burns effect) */}
                    <Image
                        src="/images/home/Horizontal-Apartments.webp"
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="animate-ken-burns object-cover"
                    />
                    {/* Dark overlay keeps the white text readable */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"
                    />
                    <div className="relative mx-auto w-full max-w-6xl px-4 py-20 text-center sm:py-28">
                        <Reveal variant="fade-in">
                            <Logo className="animate-breathe mx-auto mb-6 h-16 w-16" />
                        </Reveal>
                        <Reveal variant="fade-up" delay={100}>
                            <h1 className="text-4xl font-bold sm:text-5xl">
                                Comfort you can count on, all year round
                            </h1>
                        </Reveal>
                        <Reveal variant="fade-up" delay={220}>
                            <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-300">
                                Reliable heating and cooling services from{" "}
                                {business.name}. Book your appointment online in
                                minutes.
                            </p>
                        </Reveal>
                        <Reveal variant="fade-up" delay={340}>
                            <div className="mt-8 flex flex-wrap justify-center gap-4">
                                <Link
                                    href="/book"
                                    className="group animate-pulse-ring rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black transition duration-200 hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-lg"
                                >
                                    Book an appointment <Arrow />
                                </Link>
                                <Link
                                    href="/services"
                                    className="group rounded-lg bg-white px-6 py-3 font-semibold text-black transition duration-200 hover:-translate-y-1 hover:bg-neutral-200 hover:shadow-lg"
                                >
                                    View services <Arrow />
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </section>

                <section aria-label="Emergency service" className="bg-red-700">
                    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 px-4 py-4 text-center sm:flex-row sm:gap-4">
                        <p className="flex items-center gap-2 font-medium text-white">
                            <span
                                aria-hidden="true"
                                className="animate-pulse-soft h-2.5 w-2.5 shrink-0 rounded-full bg-yellow-300"
                            />
                            No heat or no AC? Same-day emergency service
                            available.
                        </p>
                        <a
                            href={`tel:${business.phone}`}
                            className="inline-flex items-center gap-1.5 font-bold text-white underline-offset-4 hover:underline"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="icon-wiggle h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z" />
                            </svg>
                            Call {phone}
                        </a>
                    </div>
                </section>
            </div>

            <section className="mx-auto max-w-6xl px-4 py-16">
                <Reveal variant="fade-right">
                    <h2 className="text-2xl font-bold text-neutral-900">
                        What we do
                    </h2>
                </Reveal>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((s, i) => (
                        <Reveal key={s.id} variant="fade-up" delay={i * 100}>
                            <ServiceCard service={s} />
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="overflow-hidden bg-neutral-950 text-white">
                <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
                    <Reveal variant="fade-left">
                        <p className="text-sm font-semibold uppercase tracking-wider text-yellow-400">
                            Residential buildings
                        </p>
                        <h2 className="mt-2 text-3xl font-bold">
                            Comfort for the places people call home
                        </h2>
                        <p className="mt-4 text-neutral-300">
                            From single-family homes to multi-story apartment
                            communities, {business.name} keeps heating and
                            cooling running smoothly for residents and property
                            managers alike.
                        </p>
                        <Link
                            href="/contact"
                            className="group mt-6 inline-block rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition duration-200 hover:-translate-y-1 hover:bg-red-500 hover:shadow-lg"
                        >
                            Talk to our team <Arrow />
                        </Link>
                    </Reveal>
                    <Reveal variant="fade-right" delay={150}>
                        <div className="group overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 transition duration-500 hover:-translate-y-1">
                            <Image
                                src="/images/home/journal-sq-gif.gif"
                                alt="Animated rendering of a modern residential apartment building at dusk"
                                width={552}
                                height={416}
                                // Animated GIFs are served as-is, so skip the image optimizer
                                unoptimized
                                className="h-auto w-full transition duration-700 group-hover:scale-105"
                            />
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="bg-neutral-50">
                <div className="mx-auto max-w-6xl px-4 py-16">
                    <Reveal variant="fade-right">
                        <h2 className="text-2xl font-bold text-neutral-900">
                            Why choose {business.name}
                        </h2>
                    </Reveal>
                    <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {reasons.map((r, i) => (
                            <Reveal
                                as="li"
                                key={r.title}
                                variant="fade-up"
                                delay={i * 100}
                            >
                                <div className="group h-full rounded-xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-700 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white">
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="h-6 w-6 transition-transform duration-500 group-hover:rotate-[360deg]"
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
                                    <h3 className="mt-4 font-semibold text-neutral-900 transition-colors group-hover:text-red-700">
                                        {r.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-neutral-600">
                                        {r.text}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="mx-auto max-w-6xl overflow-hidden px-4 py-16">
                <Reveal variant="fade-left">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <h2 className="text-2xl font-bold text-neutral-900">
                            Recent work
                        </h2>
                        <Link
                            href="/gallery"
                            className="group font-semibold text-red-700 transition-colors hover:text-red-600"
                        >
                            See the full gallery <Arrow />
                        </Link>
                    </div>
                </Reveal>
                <div className="mt-8 grid gap-6 px-2 pb-6 sm:grid-cols-3">
                    {floatingPhotos.map((p, i) => (
                        <Reveal key={p.src} variant="fade-in" delay={i * 150}>
                            <Link
                                href="/gallery"
                                className={`${p.float} ${p.offset} group relative block aspect-[4/3] overflow-hidden rounded-xl bg-neutral-200 shadow-lg transition-shadow duration-300 hover:shadow-2xl`}
                            >
                                <Image
                                    src={p.src}
                                    alt={p.alt}
                                    fill
                                    sizes="(min-width: 1024px) 384px, (min-width: 640px) 33vw, 100vw"
                                    className="object-cover transition duration-500 group-hover:scale-110"
                                />
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="bg-neutral-50">
                <div className="mx-auto max-w-6xl px-4 py-16">
                    <Reveal variant="fade-right">
                        <h2 className="text-2xl font-bold text-neutral-900">
                            What our customers say
                        </h2>
                    </Reveal>
                    <ul className="mt-8 grid gap-6 md:grid-cols-3">
                        {testimonials.map((t, i) => (
                            <Reveal
                                as="li"
                                key={t.name}
                                variant={
                                    i === 0
                                        ? "fade-left"
                                        : i === 2
                                          ? "fade-right"
                                          : "fade-up"
                                }
                                delay={i * 100}
                            >
                                <figure className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-yellow-300 hover:shadow-xl">
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
                            </Reveal>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="overflow-hidden bg-red-700 text-white">
                <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:items-center">
                    <Reveal variant="fade-left">
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
                    </Reveal>
                    <Reveal
                        variant="fade-right"
                        className="flex flex-col gap-3 sm:flex-row md:justify-end"
                    >
                        <Link
                            href="/book"
                            className="group animate-pulse-ring rounded-lg bg-yellow-400 px-6 py-3 text-center font-semibold text-black transition duration-200 hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-lg"
                        >
                            Book an appointment <Arrow />
                        </Link>
                        <a
                            href={`tel:${business.phone}`}
                            className="rounded-lg bg-white px-6 py-3 text-center font-semibold text-black transition duration-200 hover:-translate-y-1 hover:bg-neutral-200 hover:shadow-lg"
                        >
                            Call {phone}
                        </a>
                    </Reveal>
                </div>
            </section>

            {/* Service-area map: its own section, right under the red one */}
            <section className="w-full">
                <Reveal variant="fade-in">
                    {/* Full-width map; the height is set by the h-… classes below.
                        The link on top makes a click open the full map in Google Maps
                        (instead of panning the small embed). */}
                    <div className="group relative h-80 w-full overflow-hidden sm:h-[28rem]">
                        <iframe
                            title={`Map of ${business.mapQuery} and surrounding towns`}
                            src={`https://www.google.com/maps?q=${encodeURIComponent(business.mapQuery)}&z=10&output=embed`}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            tabIndex={-1}
                            className="absolute inset-0 h-full w-full border-0"
                        />
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.mapQuery)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${business.mapQuery} in Google Maps (opens in a new tab)`}
                            className="absolute inset-0 flex items-end justify-end bg-black/0 p-3 transition-colors duration-300 hover:bg-black/10"
                        >
                            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-lg transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-xl">
                                Open in Google Maps ↗
                            </span>
                        </a>
                    </div>
                </Reveal>
            </section>
        </>
    );
}
