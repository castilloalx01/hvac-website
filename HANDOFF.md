# HVAC Website: Handoff Plan (Days 2-3 + Pre-demo)

## Project context
Demo prototype of a website for an HVAC business. Customers can browse services, see photos of the work, and book appointments online. The goal is a polished, demo-ready prototype to show the client, not a production system.

**Stack:** Next.js (App Router, v16), TypeScript, Tailwind CSS. Deploy target: Vercel.

## Current state (Day 1 complete)
- `app/layout.tsx`: root layout with `<Navbar />` and `<main>{children}</main>`
- `app/page.tsx`: Home (gradient hero + services grid)
- `app/services/page.tsx`: Services page (grid of `ServiceCard`)
- `components/Navbar.tsx`: sticky navbar, links hidden below `sm`, "Call now" button
- `components/ServiceCard.tsx`: card with image, name, description, duration, "Book now" link to `/book?service=<id>`
- `data/services.ts`: `Service` type and `services` array (maintenance, quotes, diagnostics, installations)
- `public/images/`: one image per service (`.webp`)
- `app/gallery/page.tsx`, `app/book/page.tsx`, `app/admin/page.tsx`: "Coming soon" placeholders

## Conventions (follow these)
- **All code, comments, strings, and UI text in English.**
- **4-space indentation**, Prettier + ESLint (`.prettierrc` and `.vscode/settings.json` already configured).
- Components: PascalCase files in `components/`, `export default function`.
- Data/types/utilities: camelCase files, named exports (e.g. `data/`, `lib/`).
- Use `@/` import alias. Use `next/image` for images and `next/link` for internal links.
- Tailwind only (no separate CSS files). Palette: red (primary buttons, links, selected states), yellow with black text (CTA buttons), black and white (backgrounds, text); use Tailwind `neutral` for grays.
- Keep it simple. Don't add libraries beyond those listed here without a reason.
- Check Next.js 16 behavior before using APIs (e.g. `searchParams` in server pages is async; `useSearchParams` in client components needs a `<Suspense>` boundary).

## Placeholders to keep easy to replace
- Business name "CoolAir HVAC" and phone `+15555555555`: move both into a single `lib/business.ts` (`export const business = { name, phone, email, serviceArea, hours }`) and use it everywhere.

---

## DAY 2: Booking flow + saving appointments

**Goal:** a customer can pick a service, choose a date and time, enter their info, see a confirmation, and the appointment appears on `/admin`.

### Task 2.1: Data model
- [ ] In `data/services.ts`, add `durationMinutes: number` to `Service` (maintenance 60, quotes 30, diagnostics 60, installations 240). Keep the `duration` string for display.
- [ ] Create `lib/appointments.ts` with:
  - `type Appointment = { id: string; serviceId: string; date: string; time: string; name: string; phone: string; email: string; address: string; notes?: string; createdAt: string }` (`date` as `YYYY-MM-DD`, `time` as `HH:mm`)
  - `getAppointments(): Appointment[]`, `saveAppointment(a: Appointment): void`, `deleteAppointment(id: string): void`, all backed by `localStorage` under one key. Wrap access in try/catch and guard against SSR (`typeof window === "undefined"`).
- [ ] Create `lib/slots.ts` with `getAvailableSlots(date: string, service: Service, existing: Appointment[]): string[]`:
  - Business hours 8:00-17:00, Monday-Saturday (Sunday closed), 30-minute grid
  - A slot is unavailable if the service would overlap an existing appointment (use each appointment's service `durationMinutes`)
  - A slot must fit before closing time
  - Past times today are unavailable

### Task 2.2: Install dependencies
- [ ] `npm install react-day-picker react-hook-form zod @hookform/resolvers date-fns`

### Task 2.3: Booking page shell
- [ ] `app/book/page.tsx` renders `<BookingForm />` (client component) inside a `<Suspense>` boundary, with a page title and short intro.
- [ ] `components/BookingForm.tsx` (`"use client"`): a 4-step wizard with a visible step indicator (Service, Date & Time, Your Info, Confirm). State kept in the form component.

### Task 2.4: Step 1, service selection
- [ ] Show the 4 services as selectable cards (name, duration). Selected card is visually highlighted.
- [ ] Read `?service=<id>` from the URL and preselect it; if valid, skip straight to step 2 or show it preselected (pick one and be consistent).
- [ ] "Next" is disabled until a service is selected.

### Task 2.5: Step 2, date and time
- [ ] `react-day-picker` calendar: disable past dates and Sundays, limit booking to the next 60 days.
- [ ] After a date is chosen, show available time slots from `getAvailableSlots` as buttons; selected slot highlighted. Show "No times available" when empty.
- [ ] "Back" and "Next" buttons; Next disabled until date and time are selected.

### Task 2.6: Step 3, customer info
- [ ] Form with `react-hook-form` + `zod` (`zodResolver`): name (required), phone (required, valid-looking US phone), email (required, valid), address (required), notes (optional textarea).
- [ ] Inline error messages under each field. Labels linked to inputs for accessibility.

### Task 2.7: Step 4, confirmation
- [ ] Review screen summarizing service, date, time, and customer info, with "Edit" shortcuts back to earlier steps.
- [ ] "Confirm appointment" saves via `saveAppointment` (generate id with `crypto.randomUUID()`), then shows a success screen with a summary, a fake "A confirmation email has been sent to <email>" message, and buttons "Book another" and "Back to home".
- [ ] Re-check slot availability right before saving (in case it was taken); if taken, return to step 2 with a message.

### Task 2.8: Admin page
- [ ] `app/admin/page.tsx` (client): table of appointments sorted by date/time (upcoming first) with service name, date, time, customer, phone, address, and a Delete button (with confirm).
- [ ] Empty state message when there are no appointments.
- [ ] Link to `/admin` is NOT in the public Navbar (demo access by URL only). Add a small "Demo data" note on the page.
- [ ] Add a "Load sample data" button that seeds 5-6 realistic appointments over the next week, and a "Clear all" button. These make the demo reliable.

### Day 2 acceptance criteria
- Clicking "Book now" on a service card lands on `/book` with that service preselected.
- An already-booked time slot cannot be selected again.
- Validation blocks invalid input; the happy path works end to end.
- A booked appointment appears in `/admin` after a page refresh.
- No hydration errors or console errors; `npm run build` passes.

---

## DAY 3: Gallery, mobile polish, extra pages

### Task 3.1: Gallery page
- [ ] Create `data/gallery.ts` with `GalleryImage = { id: string; src: string; alt: string; category: "maintenance" | "quotes" | "diagnostics" | "installations" }` and 8-12 entries.
- [ ] `public/images/gallery/`: placeholder photos (stock, e.g. Unsplash/Pexels; avoid visible brand logos). Use `.webp`.
- [ ] `app/gallery/page.tsx`: responsive grid (`next/image`, `fill`, `object-cover`, `sizes` set), category filter buttons (All + each service).
- [ ] Lightbox: click an image to open a modal with a larger version, close on Esc/backdrop click/close button, arrow keys to navigate. Build with a small custom component (`components/Lightbox.tsx`) rather than a library.

### Task 3.2: Mobile navigation
- [ ] Add a hamburger menu to `Navbar` for screens below `sm`: toggles a dropdown/panel with all links. Close on link click. Accessible (`aria-expanded`, `aria-label`).
- [ ] Keep the "Call now" button visible on mobile. Make it a `tel:` link using `business.phone`.

### Task 3.3: Home page additions
- [ ] "Why choose us" section (3-4 items with simple icons: licensed & insured, same-day service, upfront pricing, warranty). Placeholder copy, easy to edit.
- [ ] Testimonials section (3 placeholder cards, clearly marked in code as placeholders to replace with real client reviews).
- [ ] "Service area and hours" section using `business` data.
- [ ] Emergency/same-day banner with the phone number.

### Task 3.4: Footer and contact
- [ ] `components/Footer.tsx`: business name, phone, email, service area, hours, quick links. Add to `layout.tsx` below `<main className="flex-1">`.
- [ ] `app/contact/page.tsx`: contact details, service area, hours (a contact form is optional; if added, it only needs to show a success message). Add "Contact" to the Navbar links.

### Task 3.5: Polish
- [ ] Consistent spacing, typography scale, and button styles across pages; focus states visible on all interactive elements.
- [ ] Add `loading.tsx` or skeletons only where something visibly lags.
- [ ] Page-specific `metadata` (title/description) for each route; add `app/not-found.tsx`.
- [ ] Favicon replaced with a simple logo/icon.
- [ ] Run Lighthouse (mobile): aim for Performance, Accessibility, and SEO all 90+. Fix alt text, contrast, and image sizing issues.
- [ ] Test at 375px, 768px, and 1280px widths and on a real phone.

### Day 3 acceptance criteria
- Every Navbar link works on desktop and mobile; no "Coming soon" placeholders remain on public pages.
- Gallery filter and lightbox work with mouse, keyboard, and touch.
- No layout breaks between 360px and 1440px.
- `npm run build` and `npm run lint` pass with no errors.

---

## PRE-DEMO: Deploy and rehearse

- [ ] Replace placeholder business info in `lib/business.ts` with the client's real name, phone, email, hours, and service area (ask the client if unknown).
- [ ] Replace stock photos with client photos if available.
- [ ] Deploy to Vercel (connect the GitHub repo; every push to `main` redeploys). Confirm the production URL works on a phone.
- [ ] Seed the demo: open `/admin`, click "Clear all", then "Load sample data".
- [ ] Rehearse the happy path: Home -> Services -> Book now -> pick date/time -> fill info -> confirmation -> `/admin` shows the new appointment.
- [ ] Prepare a fallback: screenshots or a short screen recording of the happy path in case of Wi-Fi problems.
- [ ] README: update with project description, tech stack, how to run locally, and a demo-notes section (appointments are stored in the browser's localStorage; no real emails or payments).

## Known limitations to mention to the client
- Appointments are stored in the browser (`localStorage`) for the demo; a real version needs a database (e.g. Supabase) and real email/SMS confirmations.
- No online payments.
- `/admin` has no authentication in the demo; a real version needs login.

## Suggested next phase (after the demo, if the client approves)
1. Supabase (or similar) for appointments, with server-side slot validation to prevent double booking
2. Email/SMS confirmations (Resend, Twilio)
3. Admin authentication and the ability to block days/times
4. Custom domain and Google Business Profile / local SEO
