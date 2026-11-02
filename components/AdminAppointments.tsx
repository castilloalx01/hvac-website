/*

Admin table of appointments (upcoming first, then past), with delete,
"Load sample data" and "Clear all" buttons for demos.
Must be rendered inside <Suspense> (it reads the current date).

*/
"use client";

import { useState } from "react";
import { getService } from "@/data/services";
import {
    clearAppointments,
    deleteAppointment,
    getAppointments,
    saveAppointments,
    sortAppointments,
    useAppointments,
    type Appointment,
} from "@/lib/appointments";
import { formatDateShort, formatTime, toDateKey } from "@/lib/dates";
import { createSampleAppointments } from "@/lib/sampleAppointments";

const smallButton =
    "rounded-md px-3 py-1.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50";

export default function AdminAppointments() {
    const appointments = useAppointments();
    // Id of the row (or "all") waiting for delete confirmation
    const [confirming, setConfirming] = useState<string | null>(null);

    const now = new Date();
    const nowKey = `${toDateKey(now)} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const sorted = sortAppointments(appointments);
    const upcoming = sorted.filter((a) => `${a.date} ${a.time}` >= nowKey);
    const past = sorted.filter((a) => `${a.date} ${a.time}` < nowKey);

    function loadSamples() {
        saveAppointments(createSampleAppointments(getAppointments()));
    }

    function remove(id: string) {
        deleteAppointment(id);
        setConfirming(null);
    }

    function clearAll() {
        clearAppointments();
        setConfirming(null);
    }

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-neutral-700">
                    <span className="font-semibold text-neutral-900">
                        {upcoming.length}
                    </span>{" "}
                    upcoming
                    {past.length > 0 && <>, {past.length} past</>}
                </p>
                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={loadSamples}
                        className={`${smallButton} bg-red-600 text-white hover:bg-red-700`}
                    >
                        Load sample data
                    </button>
                    {confirming === "all" ? (
                        <>
                            <button
                                type="button"
                                onClick={clearAll}
                                className={`${smallButton} bg-red-600 text-white hover:bg-red-700`}
                            >
                                Yes, delete all
                            </button>
                            <button
                                type="button"
                                onClick={() => setConfirming(null)}
                                className={`${smallButton} border border-neutral-300 text-neutral-700 hover:bg-neutral-50`}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setConfirming("all")}
                            disabled={appointments.length === 0}
                            className={`${smallButton} border border-red-300 text-red-700 hover:bg-red-50`}
                        >
                            Clear all
                        </button>
                    )}
                </div>
            </div>

            {appointments.length === 0 ? (
                <div className="mt-6 rounded-2xl border-2 border-dashed border-neutral-300 p-10 text-center">
                    <p className="font-semibold text-neutral-900">
                        No appointments yet
                    </p>
                    <p className="mt-1 text-sm text-neutral-600">
                        New bookings from the website will show up here. Use
                        &quot;Load sample data&quot; to fill the table for a
                        demo.
                    </p>
                </div>
            ) : (
                <div className="relative mt-6 overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-neutral-200 text-left text-sm">
                        <thead className="bg-neutral-50 text-xs font-semibold tracking-wide text-neutral-600 uppercase">
                            <tr>
                                <th scope="col" className="px-4 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Time
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Service
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Customer
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Phone
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Address
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200">
                            {[...upcoming, ...past].map((a) => (
                                <Row
                                    key={a.id}
                                    appointment={a}
                                    isPast={past.includes(a)}
                                    confirming={confirming === a.id}
                                    onAskDelete={() => setConfirming(a.id)}
                                    onCancel={() => setConfirming(null)}
                                    onDelete={() => remove(a.id)}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

function Row({
    appointment: a,
    isPast,
    confirming,
    onAskDelete,
    onCancel,
    onDelete,
}: {
    appointment: Appointment;
    isPast: boolean;
    confirming: boolean;
    onAskDelete: () => void;
    onCancel: () => void;
    onDelete: () => void;
}) {
    return (
        <tr className={`align-top ${isPast ? "bg-neutral-50 text-neutral-500" : "text-neutral-900"}`}>
            <td className="px-4 py-3 whitespace-nowrap">
                {formatDateShort(a.date)}
                {isPast && (
                    <span className="ml-2 rounded bg-neutral-200 px-1.5 py-0.5 text-xs text-neutral-700">
                        Past
                    </span>
                )}
            </td>
            <td className="px-4 py-3 whitespace-nowrap">{formatTime(a.time)}</td>
            <td className="px-4 py-3 whitespace-nowrap">
                {getService(a.serviceId)?.name ?? a.serviceId}
            </td>
            <td className="px-4 py-3">
                <span className="block font-medium">{a.name}</span>
                <span className="block text-neutral-600">{a.email}</span>
                {a.notes && (
                    <span className="mt-1 block max-w-xs text-xs text-neutral-600">
                        {a.notes}
                    </span>
                )}
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
                <a href={`tel:${a.phone}`} className="hover:text-red-700 hover:underline">
                    {a.phone}
                </a>
            </td>
            <td className="px-4 py-3">{a.address}</td>
            <td className="px-4 py-3 text-right whitespace-nowrap">
                {confirming ? (
                    <span className="inline-flex gap-2">
                        <button
                            type="button"
                            onClick={onDelete}
                            className={`${smallButton} bg-red-600 text-white hover:bg-red-700`}
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className={`${smallButton} border border-neutral-300 text-neutral-700 hover:bg-neutral-50`}
                        >
                            Cancel
                        </button>
                    </span>
                ) : (
                    <button
                        type="button"
                        onClick={onAskDelete}
                        aria-label={`Delete appointment for ${a.name}`}
                        className={`${smallButton} text-red-700 hover:bg-red-50`}
                    >
                        Delete
                    </button>
                )}
            </td>
        </tr>
    );
}
