/*

4-step booking wizard: Service -> Date & Time -> Your Info -> Confirm.
Reads ?service=<id> to preselect a service and skip straight to step 2.
Must be rendered inside <Suspense> (it uses useSearchParams and the current date).

*/
"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { addDays, startOfDay } from "date-fns";
import { getService, services } from "@/data/services";
import {
    getAppointments,
    saveAppointment,
    useAppointments,
    type Appointment,
} from "@/lib/appointments";
import { formatDateLong, formatTime, toDateKey } from "@/lib/dates";
import {
    BOOKING_WINDOW_DAYS,
    CLOSED_DAYS,
    getAvailableSlots,
} from "@/lib/slots";

const steps = ["Service", "Date & Time", "Your Info", "Confirm"];

// Accepts 10-digit US numbers with or without +1 and any formatting
function isUsPhone(value: string): boolean {
    const digits = value.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
    return /^[2-9]\d{2}[2-9]\d{6}$/.test(digits);
}

const customerSchema = z.object({
    name: z.string().trim().min(1, "Please enter your name"),
    phone: z
        .string()
        .trim()
        .min(1, "Please enter your phone number")
        .refine(isUsPhone, "Enter a valid US phone number, e.g. (555) 123-4567"),
    email: z
        .string()
        .trim()
        .min(1, "Please enter your email")
        .pipe(z.email("Enter a valid email address")),
    address: z.string().trim().min(1, "Please enter the service address"),
    notes: z
        .string()
        .trim()
        .max(500, "Notes can be up to 500 characters")
        .optional(),
});

type CustomerInfo = z.infer<typeof customerSchema>;

const emptyCustomer: CustomerInfo = {
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
};

// Brand colors for react-day-picker (Tailwind red-600 / red-100)
const calendarStyle = {
    "--rdp-accent-color": "#dc2626",
    "--rdp-accent-background-color": "#fee2e2",
} as CSSProperties;

const primaryButton =
    "rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500";
const secondaryButton =
    "rounded-lg border border-neutral-300 bg-white px-5 py-2.5 font-semibold text-neutral-700 hover:bg-neutral-50";
const editButton =
    "text-sm font-medium text-red-600 hover:text-red-800 hover:underline";

export default function BookingForm() {
    const searchParams = useSearchParams();
    const preselected = getService(searchParams.get("service"));
    const appointments = useAppointments();

    const [step, setStep] = useState(preselected ? 1 : 0);
    const [serviceId, setServiceId] = useState(preselected?.id ?? "");
    const [date, setDate] = useState<Date>();
    const [time, setTime] = useState("");
    const [customer, setCustomer] = useState<CustomerInfo | null>(null);
    const [notice, setNotice] = useState("");
    const [booked, setBooked] = useState<Appointment | null>(null);

    const form = useForm<CustomerInfo>({
        resolver: zodResolver(customerSchema),
        defaultValues: emptyCustomer,
        mode: "onTouched",
    });
    const { errors } = form.formState;

    // Move focus to the new step's heading after navigating (not on first load)
    const headingRef = useRef<HTMLHeadingElement>(null);
    const hasNavigated = useRef(false);
    useEffect(() => {
        if (hasNavigated.current) headingRef.current?.focus();
    }, [step, booked]);

    const service = getService(serviceId);
    const dateKey = date ? toDateKey(date) : "";
    const today = startOfDay(new Date());
    const slots =
        service && date
            ? getAvailableSlots(dateKey, service, appointments)
            : [];

    function goTo(next: number) {
        hasNavigated.current = true;
        setStep(next);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function selectService(id: string) {
        setServiceId(id);
        // A different duration can make the chosen time invalid
        setTime("");
    }

    function selectDate(next: Date | undefined) {
        setDate(next);
        setTime("");
        setNotice("");
    }

    function submitCustomer(e: React.FormEvent<HTMLFormElement>) {
        return form.handleSubmit((values) => {
            setCustomer(values);
            goTo(3);
        })(e);
    }

    function confirm() {
        if (!service || !date || !time || !customer) return;

        // Re-check in case the slot was taken since it was picked (e.g. in another tab)
        const stillFree = getAvailableSlots(
            dateKey,
            service,
            getAppointments(),
        ).includes(time);
        if (!stillFree) {
            setTime("");
            setNotice(
                "Sorry, that time was just booked. Please choose another time.",
            );
            goTo(1);
            return;
        }

        const appointment: Appointment = {
            id: crypto.randomUUID(),
            serviceId: service.id,
            date: dateKey,
            time,
            name: customer.name,
            phone: customer.phone,
            email: customer.email,
            address: customer.address,
            notes: customer.notes || undefined,
            createdAt: new Date().toISOString(),
        };
        saveAppointment(appointment);
        hasNavigated.current = true;
        setBooked(appointment);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function reset() {
        setServiceId("");
        setDate(undefined);
        setTime("");
        setCustomer(null);
        setNotice("");
        setBooked(null);
        form.reset(emptyCustomer);
        goTo(0);
    }

    if (booked) {
        return (
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col items-center text-center">
                    <div
                        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700"
                        aria-hidden="true"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="h-8 w-8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                        >
                            <path
                                d="M5 13l4 4L19 7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <h2
                        ref={headingRef}
                        tabIndex={-1}
                        className="mt-4 text-2xl font-bold text-neutral-900 outline-none"
                    >
                        Your appointment is booked!
                    </h2>
                    <p className="mt-2 text-neutral-600">
                        A confirmation email has been sent to{" "}
                        <span className="font-medium text-neutral-900">
                            {booked.email}
                        </span>
                        .
                    </p>
                </div>

                <dl className="mt-8 divide-y divide-neutral-200 rounded-xl border border-neutral-200">
                    <SummaryRow label="Service">
                        {getService(booked.serviceId)?.name}
                    </SummaryRow>
                    <SummaryRow label="Date">
                        {formatDateLong(booked.date)}
                    </SummaryRow>
                    <SummaryRow label="Time">{formatTime(booked.time)}</SummaryRow>
                    <SummaryRow label="Name">{booked.name}</SummaryRow>
                    <SummaryRow label="Address">{booked.address}</SummaryRow>
                </dl>

                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
                    <Link href="/" className={`${secondaryButton} text-center`}>
                        Back to home
                    </Link>
                    <button type="button" onClick={reset} className={primaryButton}>
                        Book another
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <StepIndicator current={step} />

            <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-8">
                <h2
                    ref={headingRef}
                    tabIndex={-1}
                    className="text-xl font-bold text-neutral-900 outline-none"
                >
                    {
                        [
                            "Choose a service",
                            "Pick a date and time",
                            "Your information",
                            "Review and confirm",
                        ][step]
                    }
                </h2>

                {step === 0 && (
                    <>
                        <fieldset className="mt-6">
                            <legend className="sr-only">Service</legend>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {services.map((s) => (
                                    <label
                                        key={s.id}
                                        className="flex cursor-pointer items-start gap-3 rounded-xl border-2 border-neutral-200 p-4 transition hover:border-red-300 has-checked:border-red-600 has-checked:bg-red-50 has-focus-visible:ring-2 has-focus-visible:ring-red-600 has-focus-visible:ring-offset-2"
                                    >
                                        <input
                                            type="radio"
                                            name="service"
                                            value={s.id}
                                            checked={serviceId === s.id}
                                            onChange={() => selectService(s.id)}
                                            className="mt-1 h-4 w-4 accent-red-600"
                                        />
                                        <span>
                                            <span className="block font-semibold text-neutral-900">
                                                {s.name}
                                            </span>
                                            <span className="mt-1 block text-sm text-neutral-600">
                                                {s.duration}
                                            </span>
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                        <div className="mt-8 flex justify-end">
                            <button
                                type="button"
                                onClick={() => goTo(1)}
                                disabled={!service}
                                className={primaryButton}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}

                {step === 1 && service && (
                    <>
                        <p className="mt-2 text-sm text-neutral-600">
                            {service.name} ({service.duration}).{" "}
                            <button
                                type="button"
                                onClick={() => goTo(0)}
                                className={editButton}
                            >
                                Change service
                            </button>
                        </p>
                        {notice && (
                            <p
                                role="alert"
                                className="mt-4 rounded-lg bg-yellow-50 p-3 text-sm font-medium text-yellow-900"
                            >
                                {notice}
                            </p>
                        )}
                        <div className="mt-6 grid gap-8 md:grid-cols-2">
                            <div className="flex justify-center md:justify-start">
                                <DayPicker
                                    mode="single"
                                    selected={date}
                                    onSelect={selectDate}
                                    defaultMonth={date ?? today}
                                    startMonth={today}
                                    endMonth={addDays(today, BOOKING_WINDOW_DAYS)}
                                    disabled={[
                                        { before: today },
                                        {
                                            after: addDays(
                                                today,
                                                BOOKING_WINDOW_DAYS,
                                            ),
                                        },
                                        { dayOfWeek: CLOSED_DAYS },
                                        (d) =>
                                            getAvailableSlots(
                                                toDateKey(d),
                                                service,
                                                appointments,
                                            ).length === 0,
                                    ]}
                                    style={calendarStyle}
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-neutral-900">
                                    {date
                                        ? formatDateLong(dateKey)
                                        : "Available times"}
                                </h3>
                                {!date && (
                                    <p className="mt-2 text-sm text-neutral-600">
                                        Select a date to see available times.
                                        We&apos;re closed on Sundays.
                                    </p>
                                )}
                                {date && slots.length === 0 && (
                                    <p className="mt-2 text-sm text-neutral-600">
                                        No times available on this day. Please
                                        pick another date.
                                    </p>
                                )}
                                {slots.length > 0 && (
                                    <div
                                        role="group"
                                        aria-label="Available times"
                                        className="mt-3 grid grid-cols-3 gap-2"
                                    >
                                        {slots.map((slot) => (
                                            <button
                                                key={slot}
                                                type="button"
                                                onClick={() => setTime(slot)}
                                                aria-pressed={time === slot}
                                                className={`rounded-lg border px-2 py-2 text-sm font-medium transition ${
                                                    time === slot
                                                        ? "border-red-600 bg-red-600 text-white"
                                                        : "border-neutral-300 text-neutral-700 hover:border-red-400 hover:bg-red-50"
                                                }`}
                                            >
                                                {formatTime(slot)}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-8 flex justify-between gap-3">
                            <button
                                type="button"
                                onClick={() => goTo(0)}
                                className={secondaryButton}
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                onClick={() => goTo(2)}
                                disabled={!date || !time}
                                className={primaryButton}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <form onSubmit={submitCustomer} noValidate className="mt-6">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field
                                id="name"
                                label="Full name"
                                error={errors.name?.message}
                            >
                                <input
                                    id="name"
                                    type="text"
                                    autoComplete="name"
                                    {...form.register("name")}
                                    {...fieldProps("name", errors.name?.message)}
                                />
                            </Field>
                            <Field
                                id="phone"
                                label="Phone"
                                error={errors.phone?.message}
                            >
                                <input
                                    id="phone"
                                    type="tel"
                                    autoComplete="tel"
                                    placeholder="(555) 123-4567"
                                    {...form.register("phone")}
                                    {...fieldProps("phone", errors.phone?.message)}
                                />
                            </Field>
                            <Field
                                id="email"
                                label="Email"
                                error={errors.email?.message}
                            >
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    {...form.register("email")}
                                    {...fieldProps("email", errors.email?.message)}
                                />
                            </Field>
                            <Field
                                id="address"
                                label="Service address"
                                error={errors.address?.message}
                            >
                                <input
                                    id="address"
                                    type="text"
                                    autoComplete="street-address"
                                    {...form.register("address")}
                                    {...fieldProps(
                                        "address",
                                        errors.address?.message,
                                    )}
                                />
                            </Field>
                            <div className="sm:col-span-2">
                                <Field
                                    id="notes"
                                    label="Notes (optional)"
                                    error={errors.notes?.message}
                                >
                                    <textarea
                                        id="notes"
                                        rows={4}
                                        placeholder="Tell us about the problem, your system, or access instructions."
                                        {...form.register("notes")}
                                        {...fieldProps(
                                            "notes",
                                            errors.notes?.message,
                                        )}
                                    />
                                </Field>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-between gap-3">
                            <button
                                type="button"
                                onClick={() => goTo(1)}
                                className={secondaryButton}
                            >
                                Back
                            </button>
                            <button type="submit" className={primaryButton}>
                                Next
                            </button>
                        </div>
                    </form>
                )}

                {step === 3 && service && date && customer && (
                    <>
                        <dl className="mt-6 divide-y divide-neutral-200 rounded-xl border border-neutral-200">
                            <SummaryRow
                                label="Service"
                                action={
                                    <button
                                        type="button"
                                        onClick={() => goTo(0)}
                                        className={editButton}
                                        aria-label="Edit service"
                                    >
                                        Edit
                                    </button>
                                }
                            >
                                {service.name} ({service.duration})
                            </SummaryRow>
                            <SummaryRow
                                label="Date & time"
                                action={
                                    <button
                                        type="button"
                                        onClick={() => goTo(1)}
                                        className={editButton}
                                        aria-label="Edit date and time"
                                    >
                                        Edit
                                    </button>
                                }
                            >
                                {formatDateLong(dateKey)} at {formatTime(time)}
                            </SummaryRow>
                            <SummaryRow
                                label="Your info"
                                action={
                                    <button
                                        type="button"
                                        onClick={() => goTo(2)}
                                        className={editButton}
                                        aria-label="Edit your information"
                                    >
                                        Edit
                                    </button>
                                }
                            >
                                <span className="block">{customer.name}</span>
                                <span className="block">{customer.phone}</span>
                                <span className="block">{customer.email}</span>
                                <span className="block">{customer.address}</span>
                                {customer.notes && (
                                    <span className="mt-2 block text-neutral-600">
                                        Notes: {customer.notes}
                                    </span>
                                )}
                            </SummaryRow>
                        </dl>
                        <div className="mt-8 flex justify-between gap-3">
                            <button
                                type="button"
                                onClick={() => goTo(2)}
                                className={secondaryButton}
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                onClick={confirm}
                                className="rounded-lg bg-yellow-400 text-black px-5 py-2.5 font-semibold hover:bg-yellow-300"
                            >
                                Confirm appointment
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

function StepIndicator({ current }: { current: number }) {
    return (
        <nav aria-label="Booking progress">
            <ol className="flex items-center gap-2">
                {steps.map((label, i) => {
                    const done = i < current;
                    const active = i === current;
                    return (
                        <li
                            key={label}
                            aria-current={active ? "step" : undefined}
                            className="flex flex-1 items-center gap-2"
                        >
                            <span
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                                    done
                                        ? "bg-red-600 text-white"
                                        : active
                                          ? "border-2 border-red-600 bg-white text-red-700"
                                          : "border-2 border-neutral-300 bg-white text-neutral-500"
                                }`}
                            >
                                {done ? "✓" : i + 1}
                                <span className="sr-only">
                                    {done ? " (completed)" : ""}
                                </span>
                            </span>
                            <span
                                className={`text-sm font-medium whitespace-nowrap ${
                                    active
                                        ? "text-neutral-900"
                                        : "hidden text-neutral-500 sm:inline"
                                }`}
                            >
                                {label}
                            </span>
                            {i < steps.length - 1 && (
                                <span
                                    className={`h-0.5 flex-1 rounded ${done ? "bg-red-600" : "bg-neutral-200"}`}
                                    aria-hidden="true"
                                />
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

function Field({
    id,
    label,
    error,
    children,
}: {
    id: string;
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-neutral-900">
                {label}
            </label>
            <div className="mt-1">{children}</div>
            {error && (
                <p id={`${id}-error`} className="mt-1 text-sm text-red-700">
                    {error}
                </p>
            )}
        </div>
    );
}

function fieldProps(id: string, error?: string) {
    return {
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? `${id}-error` : undefined,
        className: `block w-full rounded-lg border px-3 py-2 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 ${
            error
                ? "border-red-500 focus:ring-red-500"
                : "border-neutral-300 focus:border-neutral-900 focus:ring-neutral-900"
        }`,
    };
}

function SummaryRow({
    label,
    action,
    children,
}: {
    label: string;
    action?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1 p-4 sm:flex-row sm:gap-4">
            <dt className="text-sm font-medium text-neutral-500 sm:w-32 sm:shrink-0">
                {label}
            </dt>
            <dd className="flex flex-1 items-start justify-between gap-4 text-neutral-900">
                <span>{children}</span>
                {action}
            </dd>
        </div>
    );
}
