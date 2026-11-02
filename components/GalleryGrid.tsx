/*

Gallery grid with category filter buttons. Clicking a photo opens it in the Lightbox.

*/
"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/Lightbox";
import { galleryImages, type GalleryCategory } from "@/data/gallery";
import { services } from "@/data/services";

type Filter = "all" | GalleryCategory;

const filters: { value: Filter; label: string }[] = [
    { value: "all", label: "All" },
    ...services.map((s) => ({ value: s.id as GalleryCategory, label: s.name })),
];

export default function GalleryGrid() {
    const [filter, setFilter] = useState<Filter>("all");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const visible =
        filter === "all"
            ? galleryImages
            : galleryImages.filter((img) => img.category === filter);

    return (
        <>
            <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2">
                {filters.map((f) => (
                    <button
                        key={f.value}
                        type="button"
                        onClick={() => setFilter(f.value)}
                        aria-pressed={filter === f.value}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                            filter === f.value
                                ? "bg-red-600 text-white"
                                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                        }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
                {visible.map((img, i) => (
                    <li key={img.id}>
                        <button
                            type="button"
                            onClick={() => setOpenIndex(i)}
                            className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-200"
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                loading={i < 3 ? "eager" : undefined}
                                sizes="(min-width: 1024px) 33vw, 50vw"
                                className="object-cover transition duration-300 group-hover:scale-105"
                            />
                        </button>
                    </li>
                ))}
            </ul>

            <Lightbox
                images={visible}
                index={openIndex}
                onClose={() => setOpenIndex(null)}
                onNavigate={setOpenIndex}
            />
        </>
    );
}
