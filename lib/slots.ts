// Calculates which start times can still be booked on a given day

import { isBefore, startOfDay } from "date-fns";
import { getService, type Service } from "@/data/services";
import type { Appointment } from "@/lib/appointments";
import {
    fromDateKey,
    minutesToTime,
    timeToMinutes,
    toDateKey,
} from "@/lib/dates";

// Business hours for bookings (keep in sync with business.hours in lib/business.ts)
export const OPEN_MINUTES = 8 * 60;
export const CLOSE_MINUTES = 17 * 60;
export const SLOT_STEP_MINUTES = 30;
export const CLOSED_DAYS = [0]; // Sunday
export const BOOKING_WINDOW_DAYS = 60;

const DEFAULT_DURATION_MINUTES = 60;

export function isOpenDay(date: Date): boolean {
    return !CLOSED_DAYS.includes(date.getDay());
}

export function getAvailableSlots(
    date: string,
    service: Service,
    existing: Appointment[],
    now: Date = new Date(),
): string[] {
    const day = fromDateKey(date);
    if (!isOpenDay(day) || isBefore(day, startOfDay(now))) return [];

    const isToday = date === toDateKey(now);
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    // Time ranges already taken on this day
    const busy = existing
        .filter((a) => a.date === date)
        .map((a) => {
            const start = timeToMinutes(a.time);
            const duration =
                getService(a.serviceId)?.durationMinutes ??
                DEFAULT_DURATION_MINUTES;
            return { start, end: start + duration };
        });

    const slots: string[] = [];
    for (
        let start = OPEN_MINUTES;
        start + service.durationMinutes <= CLOSE_MINUTES;
        start += SLOT_STEP_MINUTES
    ) {
        if (isToday && start <= nowMinutes) continue;
        const end = start + service.durationMinutes;
        const overlaps = busy.some((b) => start < b.end && b.start < end);
        if (!overlaps) slots.push(minutesToTime(start));
    }
    return slots;
}
