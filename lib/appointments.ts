// Appointment type and storage. Demo only: appointments live in the browser's localStorage.

import { useSyncExternalStore } from "react";

export type Appointment = {
    id: string;
    serviceId: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:mm
    name: string;
    phone: string;
    email: string;
    address: string;
    notes?: string;
    createdAt: string;
};

const STORAGE_KEY = "coolair-appointments";
const EMPTY: Appointment[] = [];
const listeners = new Set<() => void>();

// Cache the parsed list so repeated reads return the same array (needed by useSyncExternalStore)
let cachedRaw: string | null = null;
let cachedList: Appointment[] = EMPTY;

function readRaw(): string | null {
    try {
        return window.localStorage.getItem(STORAGE_KEY);
    } catch {
        return null;
    }
}

function writeList(list: Appointment[]): void {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
        // Storage can be full or blocked (e.g. private mode); the demo just won't persist
    }
    listeners.forEach((listener) => listener());
}

export function getAppointments(): Appointment[] {
    if (typeof window === "undefined") return EMPTY;
    const raw = readRaw();
    if (raw !== cachedRaw) {
        cachedRaw = raw;
        try {
            const parsed: unknown = raw ? JSON.parse(raw) : [];
            cachedList = Array.isArray(parsed) ? parsed : EMPTY;
        } catch {
            cachedList = EMPTY;
        }
    }
    return cachedList;
}

export function saveAppointment(a: Appointment): void {
    if (typeof window === "undefined") return;
    writeList([...getAppointments(), a]);
}

export function saveAppointments(list: Appointment[]): void {
    if (typeof window === "undefined") return;
    writeList([...getAppointments(), ...list]);
}

export function deleteAppointment(id: string): void {
    if (typeof window === "undefined") return;
    writeList(getAppointments().filter((a) => a.id !== id));
}

export function clearAppointments(): void {
    if (typeof window === "undefined") return;
    writeList([]);
}

function subscribe(listener: () => void): () => void {
    listeners.add(listener);
    // Also pick up changes made in other tabs
    window.addEventListener("storage", listener);
    return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", listener);
    };
}

// React hook: current appointments, re-rendering when they change. Empty during server rendering.
export function useAppointments(): Appointment[] {
    return useSyncExternalStore(subscribe, getAppointments, () => EMPTY);
}

// Sorts by date, then time (earliest first)
export function sortAppointments(list: Appointment[]): Appointment[] {
    return [...list].sort((a, b) =>
        `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`),
    );
}
