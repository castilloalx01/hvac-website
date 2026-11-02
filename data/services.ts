// Creates the service data type and its instances

export type Service = {
    // field: type
    id: string;
    name: string;
    description: string;
    image: string;
    duration: string;
    // Used to calculate available time slots
    durationMinutes: number;
};

// Placeholder stock photos (free license, no attribution required); replace with the client's own photos.
// maintenance: pexels.com/photo/32497161 | quotes: unsplash.com/photos/kblddocwPa0
// diagnostics: pexels.com/photo/6471912 | installations: pexels.com/photo/5463587
export const services: Service[] = [
    {
        id: "maintenance",
        name: "Maintenance",
        description:
            "Seasonal tune-ups to keep your system efficient and avoid costly breakdowns.",
        image: "/images/services/maintenance.webp",
        duration: "1 hour",
        durationMinutes: 60,
    },
    {
        id: "quotes",
        name: "Quotes",
        description:
            "Free, no-obligation estimates for repairs, replacements, and new systems.",
        image: "/images/services/quotes.webp",
        duration: "30 minutes",
        durationMinutes: 30,
    },
    {
        id: "diagnostics",
        name: "Diagnostics",
        description:
            "Full system inspection to find the exact cause of cooling or heating problems.",
        image: "/images/services/diagnostics.webp",
        duration: "1 hour",
        durationMinutes: 60,
    },
    {
        id: "installations",
        name: "Installations",
        description:
            "Professional installation of AC, furnaces, heat pumps, and thermostats.",
        image: "/images/services/installations.webp",
        duration: "4-8 hours",
        durationMinutes: 240,
    },
];

export function getService(id: string | null | undefined): Service | undefined {
    return services.find((s) => s.id === id);
}
