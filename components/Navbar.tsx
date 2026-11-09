"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/navigation";
import { business } from "@/lib/business";
import Logo from "@/components/Logo";

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    // Desktop links get an underline that grows from the left on hover
    const linkClass = (href: string) =>
        pathname === href
            ? "text-red-700"
            : "text-neutral-700 transition-colors hover:text-red-600";

    return (
        <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
            <nav
                aria-label="Main"
                className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3"
            >
                <Link
                    href="/"
                    className="group flex items-center gap-2.5 font-bold text-red-700"
                >
                    <Logo className="h-9 w-9 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-base leading-tight sm:text-lg">
                        {business.name}
                    </span>
                </Link>
                <ul className="hidden gap-6 text-sm font-medium sm:flex">
                    {navLinks.map((l) => (
                        <li key={l.href}>
                            <Link
                                href={l.href}
                                aria-current={
                                    pathname === l.href ? "page" : undefined
                                }
                                className={`relative py-1 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-red-600 after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                                    pathname === l.href
                                        ? "after:scale-x-100"
                                        : "after:scale-x-0"
                                } ${linkClass(l.href)}`}
                            >
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center gap-2">
                    <a
                        href={`tel:${business.phone}`}
                        className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-black transition duration-200 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-md active:translate-y-0"
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
                    className="animate-slide-down border-t border-neutral-200 bg-white px-4 py-2 sm:hidden"
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
