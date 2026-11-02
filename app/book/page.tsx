import type { Metadata } from "next";
import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
    title: "Book an Appointment",
    description:
        "Pick a service, choose a date and time, and book your HVAC appointment online in minutes.",
};

export default function BookPage() {
    return (
        <section className="mx-auto max-w-4xl px-4 py-12">
            <h1 className="text-3xl font-bold text-neutral-900">
                Book an appointment
            </h1>
            <p className="mt-2 text-neutral-600">
                Choose a service, pick a time that works for you, and
                we&apos;ll take care of the rest.
            </p>
            <div className="mt-8">
                <Suspense fallback={<BookingSkeleton />}>
                    <BookingForm />
                </Suspense>
            </div>
        </section>
    );
}

function BookingSkeleton() {
    return (
        <div aria-hidden="true" className="animate-pulse">
            <div className="h-8 rounded-lg bg-neutral-100" />
            <div className="mt-6 h-80 rounded-2xl bg-neutral-100" />
        </div>
    );
}
