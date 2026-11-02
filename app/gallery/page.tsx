import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
    title: "Gallery",
    description:
        "Photos of our HVAC maintenance, diagnostics, and installation work.",
};

export default function GalleryPage() {
    return (
        <section className="mx-auto max-w-6xl px-4 py-12">
            <h1 className="text-3xl font-bold text-neutral-900">Our Work</h1>
            <p className="mt-2 text-neutral-600">
                A look at recent maintenance visits, repairs, and new system
                installations. Tap a photo to see it larger.
            </p>
            <div className="mt-8">
                <GalleryGrid />
            </div>
        </section>
    );
}
