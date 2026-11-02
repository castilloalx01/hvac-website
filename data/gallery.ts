// Photos shown on the Gallery page.
// Placeholder stock photos from Pexels/Unsplash (free license, brand logos blurred); replace with the client's own work.

export type GalleryCategory =
    | "maintenance"
    | "quotes"
    | "diagnostics"
    | "installations";

export type GalleryImage = {
    id: string;
    src: string;
    alt: string;
    category: GalleryCategory;
};

export const galleryImages: GalleryImage[] = [
    {
        id: "installations-heat-pump-garden",
        src: "/images/gallery/installations-heat-pump-garden.webp",
        alt: "New air-source heat pump installed beside a brick home",
        category: "installations",
    },
    {
        id: "maintenance-rooftop-gauges",
        src: "/images/gallery/maintenance-rooftop-gauges.webp",
        alt: "Technician checking refrigerant pressure on a rooftop condenser",
        category: "maintenance",
    },
    {
        id: "diagnostics-electrical-panel",
        src: "/images/gallery/diagnostics-electrical-panel.webp",
        alt: "Technician testing HVAC control wiring with a voltage tester",
        category: "diagnostics",
    },
    {
        id: "installations-ductless-mini-split",
        src: "/images/gallery/installations-ductless-mini-split.webp",
        alt: "Ductless mini-split unit installed in a modern living room",
        category: "installations",
    },
    {
        id: "quotes-condenser-replacement",
        src: "/images/gallery/quotes-condenser-replacement.webp",
        alt: "Outdoor AC condenser evaluated for replacement",
        category: "quotes",
    },
    {
        id: "maintenance-refrigerant-check",
        src: "/images/gallery/maintenance-refrigerant-check.webp",
        alt: "Technician kneeling to connect manifold gauges during a tune-up",
        category: "maintenance",
    },
    {
        id: "diagnostics-leak-detector",
        src: "/images/gallery/diagnostics-leak-detector.webp",
        alt: "Electronic leak detector checking an AC coil for refrigerant leaks",
        category: "diagnostics",
    },
    {
        id: "installations-heat-pump-modern-home",
        src: "/images/gallery/installations-heat-pump-modern-home.webp",
        alt: "Heat pump installed on a gravel pad next to a modern home",
        category: "installations",
    },
    {
        id: "maintenance-indoor-unit",
        src: "/images/gallery/maintenance-indoor-unit.webp",
        alt: "Technician servicing an indoor HVAC unit with a digital gauge",
        category: "maintenance",
    },
    {
        id: "quotes-commercial-units",
        src: "/images/gallery/quotes-commercial-units.webp",
        alt: "Row of wall-mounted heat pump units on a commercial building",
        category: "quotes",
    },
    {
        id: "diagnostics-smart-thermostat",
        src: "/images/gallery/diagnostics-smart-thermostat.webp",
        alt: "Homeowner adjusting a smart thermostat on the wall",
        category: "diagnostics",
    },
];
