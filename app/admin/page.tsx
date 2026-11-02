import type { Metadata } from "next";
import { Suspense } from "react";
import AdminAppointments from "@/components/AdminAppointments";

export const metadata: Metadata = {
    title: "Appointments (Admin)",
    robots: { index: false, follow: false },
};

// Demo admin view. Not linked from the Navbar: open it by URL (/admin).
export default function AdminPage() {
    return (
        <section className="mx-auto max-w-6xl px-4 py-12">
            <h1 className="text-3xl font-bold text-neutral-900">Appointments</h1>
            <p className="mt-2 max-w-2xl rounded-lg bg-yellow-50 p-3 text-sm text-yellow-900">
                <strong>Demo data:</strong> appointments are stored in this
                browser only. A production version would use a database and
                require a login.
            </p>
            <div className="mt-8">
                <Suspense
                    fallback={<div className="h-64 animate-pulse rounded-2xl bg-neutral-100" />}
                >
                    <AdminAppointments />
                </Suspense>
            </div>
        </section>
    );
}
