/*

A component that receives one Service and displays it as a card:
photo, name, description, duration, and a "Book now" button

*/
import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/data/services";

export default function ServiceCard({ service }: { service: Service }) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
            <div className="relative h-48 bg-gray-200">
                <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
            </div>
            <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900">
                    {service.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                    {service.description}
                </p>
                <p className="mt-3 text-xs text-gray-500">
                    Duration: {service.duration}
                </p>
                <Link
                    href={`/book?service=${service.id}`}
                    className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    Book now
                </Link>
            </div>
        </div>
    );
}
