/*

Demo contact form: validates with the browser's built-in checks and shows a success
message. Nothing is sent anywhere.

*/
"use client";

import { useState } from "react";

const inputClass =
    "block w-full rounded-lg border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-none";

export default function ContactForm() {
    const [sentTo, setSentTo] = useState("");

    if (sentTo) {
        return (
            <div role="status" className="rounded-2xl border border-green-200 bg-green-50 p-6">
                <p className="font-semibold text-green-900">Thanks, your message was sent!</p>
                <p className="mt-1 text-sm text-green-800">
                    We&apos;ll reply to {sentTo} within one business day.
                </p>
                <button
                    type="button"
                    onClick={() => setSentTo("")}
                    className="mt-4 text-sm font-medium text-red-700 hover:underline"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                setSentTo(String(data.get("email")));
            }}
            className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
        >
            <h2 className="text-xl font-bold text-neutral-900">Send us a message</h2>
            <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-neutral-900">
                    Name
                </label>
                <input id="contact-name" name="name" required autoComplete="name" className={`mt-1 ${inputClass}`} />
            </div>
            <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-neutral-900">
                    Email
                </label>
                <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={`mt-1 ${inputClass}`}
                />
            </div>
            <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-neutral-900">
                    Message
                </label>
                <textarea id="contact-message" name="message" rows={5} required className={`mt-1 ${inputClass}`} />
            </div>
            <button
                type="submit"
                className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700"
            >
                Send message
            </button>
        </form>
    );
}
