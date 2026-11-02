import { services } from "@/data/services";
import ServiceCard from "@/components/ServiceCard";

export default function ServicesPage() {
    return (
        <div>
            {services.map((s) => (
                <ServiceCard key={s.id} service={s} />
            ))}
        </div>
    );
}
