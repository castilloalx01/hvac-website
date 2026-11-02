// Business details shown across the site. Replace these placeholders with the client's real info.

export const business = {
    name: "CoolAir HVAC",
    phone: "+15555555555",
    email: "info@example.com",
    serviceArea: "Springfield and surrounding towns within 30 miles",
    // Keep in sync with the booking hours in lib/slots.ts
    hours: "Mon-Sat, 8:00 AM - 5:00 PM (closed Sunday)",
};

// "+15555555555" or "555.555.5555" -> "(555) 555-5555"
// Anything that isn't 10 digits (or 11 starting with 1) is returned unchanged.
export function formatPhone(phone: string): string {
    const digits = phone.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
    if (digits.length !== 10) return phone;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
