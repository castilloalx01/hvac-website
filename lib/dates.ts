// Helpers for the date ("YYYY-MM-DD") and time ("HH:mm") strings used by appointments

import { format, parse } from "date-fns";

export function toDateKey(date: Date): string {
    return format(date, "yyyy-MM-dd");
}

export function fromDateKey(dateKey: string): Date {
    return parse(dateKey, "yyyy-MM-dd", new Date(2000, 0, 1));
}

// "14:30" -> 870
export function timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

// 870 -> "14:30"
export function minutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

// "14:30" -> "2:30 PM"
export function formatTime(time: string): string {
    const [hours, minutes] = time.split(":").map(Number);
    return format(new Date(2000, 0, 1, hours, minutes), "h:mm a");
}

// "2026-11-05" -> "Thursday, November 5, 2026"
export function formatDateLong(dateKey: string): string {
    return format(fromDateKey(dateKey), "EEEE, MMMM d, yyyy");
}

// "2026-11-05" -> "Thu, Nov 5"
export function formatDateShort(dateKey: string): string {
    return format(fromDateKey(dateKey), "EEE, MMM d");
}
