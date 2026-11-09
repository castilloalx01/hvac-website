# True North Residential Services

Website for True North Residential Services (heating and cooling): services, gallery, contact, and online appointment booking. Built with [Next.js](https://nextjs.org) (App Router), React, and Tailwind CSS v4.

## Customizing the site

| What | Where |
| --- | --- |
| Company name, phone, email, service area, hours, map location (`mapQuery`) | `lib/business.ts` |
| Services, gallery photos, testimonials, nav links | `data/` |
| Logo (navbar, footer, hero) | `components/Logo.tsx` (same artwork as the tab icon, `app/icon.svg`) |
| Home page sections, hero photo, GIF section | `app/page.tsx` |
| Home images (hero photo, GIF) | `public/images/home/` |

### Animations

- **Scroll reveals:** wrap content in `<Reveal variant="fade-up | fade-left | fade-right | fade-in" delay={ms}>` (`components/Reveal.tsx`). It animates once when scrolled into view and stays visible without JavaScript.
- **Keyframes and effects** live in `app/globals.css`: the hero photo zoom (`ken-burns`, change its duration to adjust speed), logo `breathe`, floating gallery photos (`gallery-float-a/b`), `slide-down` for the mobile menu, and the pulse effects.
- **Hover effects** (lift, shadow, sliding arrows, icon rotation) are Tailwind utility classes on the elements themselves.
- All looping animations and reveals are turned off for visitors who prefer reduced motion.

### Notes

- The home page GIF (`journal-sq-gif.gif`) is about 10 MB. Converting it to a short looping video would make the page load much faster.
- The service-area map is a keyless Google Maps embed. A transparent link over it opens the full map in Google Maps when clicked.
- Stock photos are placeholders; replace them with the client's own and check each license.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
