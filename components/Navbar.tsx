"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/navigation";
import { business } from "@/lib/business";

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const linkClass = (href: string) =>
        pathname === href
            ? "text-red-700"
            : "text-neutral-700 hover:text-red-600";

    return (
        <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
            <nav
                aria-label="Main"
                className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3"
            >
                <Link href="/" className="text-xl font-bold text-red-700">
                    {business.name}
                </Link>
                <ul className="hidden gap-6 text-sm font-medium sm:flex">
                    {navLinks.map((l) => (
                        <li key={l.href}>
                            <Link
                                href={l.href}
                                aria-current={
                                    pathname === l.href ? "page" : undefined
                                }
                                className={linkClass(l.href)}
                            >
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center gap-2">
                    <a
                        href={`tel:${business.phone}`}
                        className="rounded-lg bg-yellow-400 text-black px-4 py-2 text-sm font-semibold hover:bg-yellow-300"
                    >
                        Call now
                    </a>
                    <button
                        type="button"
                        onClick={() => setOpen((o) => !o)}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label={open ? "Close menu" : "Open menu"}
                        className="rounded-lg p-2 text-neutral-700 hover:bg-neutral-100 sm:hidden"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            aria-hidden="true"
                        >
                            {open ? (
                                <path
                                    d="M6 6l12 12M18 6L6 18"
                                    strokeLinecap="round"
                                />
                            ) : (
                                <path
                                    d="M4 7h16M4 12h16M4 17h16"
                                    strokeLinecap="round"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>
            {open && (
                <ul
                    id="mobile-menu"
                    className="border-t border-neutral-200 bg-white px-4 py-2 sm:hidden"
                >
                    {navLinks.map((l) => (
                        <li key={l.href}>
                            <Link
                                href={l.href}
                                onClick={() => setOpen(false)}
                                aria-current={
                                    pathname === l.href ? "page" : undefined
                                }
                                className={`block rounded-lg px-3 py-3 font-medium ${linkClass(l.href)}`}
                            >
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </header>
    );
}
