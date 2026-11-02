// Creates the service data type and its instances

export type Service = {
    // field: type
    id: string;
    name: string;
    description: string;
    image: string;
    duration: string;
};

export const services: Service[] = [
    {
        id: "maintenance",
        name: "Maintenance",
        description:
            "Seasonal tune-ups to keep your system efficient and avoid costly breakdowns.",
        image: "/images/maintenance.png",
        duration: "1 hour",
    },
    {
        id: "quotes",
        name: "Quotes",
        description:
            "Free, no-obligation estimates for repairs, replacements, and new systems.",
        image: "/images/quotes.jpg",
        duration: "30 minutes",
    },
    {
        id: "diagnostics",
        name: "Diagnostics",
        description:
            "Full system inspection to find the exact cause of cooling or heating problems.",
        image: "/images/diagnostics.webp",
        duration: "1 hour",
    },
    {
        id: "installations",
        name: "Installations",
        description:
            "Professional installation of AC, furnaces, heat pumps, and thermostats.",
        image: "/images/installations.webp",
        duration: "4-8 hours",
    },
];
