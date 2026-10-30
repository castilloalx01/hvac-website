export type Service = {
    // field : type
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
        image: "/images/maintenance.jpg",
        duration: "30 minutes",
    },
];
