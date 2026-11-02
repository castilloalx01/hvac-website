/*

A component that receives one Service and displays it as a card:
photo, name, description, duration, and a "Book now" button

*/
import type { Service } from "@/data/services";

export default function ServiceCard({ service }: { service: Service }) {
    return (
        <div>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p>{service.duration}</p>
        </div>
    );
}
