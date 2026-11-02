// Realistic demo appointments spread over the next open days, used by "Load sample data" on /admin

import { addDays } from "date-fns";
import { getService } from "@/data/services";
import type { Appointment } from "@/lib/appointments";
import { toDateKey } from "@/lib/dates";
import { getAvailableSlots, isOpenDay } from "@/lib/slots";

type Sample = Omit<Appointment, "id" | "date" | "createdAt">;

const samples: Sample[] = [
    {
        serviceId: "maintenance",
        time: "09:00",
        name: "Maria Gonzalez",
        phone: "(555) 201-4432",
        email: "maria.gonzalez@example.com",
        address: "142 Oak Street, Springfield",
        notes: "Annual AC tune-up. Dog in the backyard.",
    },
    {
        serviceId: "diagnostics",
        time: "13:30",
        name: "James Carter",
        phone: "(555) 318-7720",
        email: "jcarter@example.com",
        address: "88 Maple Avenue, Springfield",
        notes: "Furnace makes a loud noise when it starts.",
    },
    {
        serviceId: "quotes",
        time: "10:00",
        name: "Linda Nguyen",
        phone: "(555) 642-1185",
        email: "linda.nguyen@example.com",
        address: "2304 Lakeview Drive, Shelbyville",
        notes: "Quote for replacing a 15-year-old central AC unit.",
    },
    {
        serviceId: "installations",
        time: "08:00",
        name: "Robert Thompson",
        phone: "(555) 775-0391",
        email: "rthompson@example.com",
        address: "19 Pine Ridge Court, Springfield",
        notes: "New heat pump installation (unit already purchased).",
    },
    {
        serviceId: "maintenance",
        time: "15:00",
        name: "Aisha Patel",
        phone: "(555) 490-2268",
        email: "aisha.patel@example.com",
        address: "507 Elm Street, Apt 3B, Springfield",
    },
    {
        serviceId: "diagnostics",
        time: "11:00",
        name: "Kevin O'Brien",
        phone: "(555) 863-5517",
        email: "kobrien@example.com",
        address: "61 Riverside Road, Capital City",
        notes: "Thermostat not responding.",
    },
];

// Builds one sample appointment per open day, skipping times that are already taken
export function createSampleAppointments(
    existing: Appointment[],
    now: Date = new Date(),
): Appointment[] {
    const created: Appointment[] = [];
    let day = addDays(now, 1);

    for (const sample of samples) {
        while (!isOpenDay(day)) day = addDays(day, 1);

        const service = getService(sample.serviceId);
        const date = toDateKey(day);
        day = addDays(day, 1);
        if (!service) continue;

        const free = getAvailableSlots(
            date,
            service,
            [...existing, ...created],
            now,
        );
        const time = free.includes(sample.time) ? sample.time : free[0];
        if (!time) continue;

        created.push({
            ...sample,
            id: crypto.randomUUID(),
            date,
            time,
            createdAt: now.toISOString(),
        });
    }
    return created;
}
