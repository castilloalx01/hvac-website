/*

A component that receives one Service and displays it as a card:
photo, name, description, duration, and a "Book now" button

*/
import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/data/services";

export default function ServiceCard({
    service,
    eager = false,
    headingLevel = "h3",
}: {
    service: Service;
    // Load the image right away (use for cards visible without scrolling)
    eager?: boolean;
    // Keeps heading order valid on pages where the cards sit right under the h1
    headingLevel?: "h2" | "h3";
}) {
    const Heading = headingLevel;
    return (
        <div className="group h-full overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">
            <div className="relative h-48 overflow-hidden bg-neutral-200">
                <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    loading={eager ? "eager" : undefined}
                    className="object-cover transition duration-500 group-hover:scale-110"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
            </div>
            <div className="p-5">
                <Heading className="text-lg font-semibold text-neutral-900">
                    {service.name}
                </Heading>
                <p className="mt-2 text-sm text-neutral-600">
                    {service.description}
                </p>
                <p className="mt-3 text-xs text-neutral-500">
                    Duration: {service.duration}
                </p>
                <Link
                    href={`/book?service=${service.id}`}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                >
                    Book now
                    <span
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                        →
                    </span>
                </Link>
            </div>
        </div>
    );
}
