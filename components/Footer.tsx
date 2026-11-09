import Link from "next/link";
import { navLinks } from "@/data/navigation";
import { business, formatPhone } from "@/lib/business";
import Logo from "@/components/Logo";

export default function Footer() {
    return (
        <footer className="bg-black text-neutral-300">
            <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <p className="flex items-center gap-2.5 text-lg font-bold text-white">
                        <Logo className="h-9 w-9 shrink-0" />
                        {business.name}
                    </p>
                    <p className="mt-2 text-sm">
                        Heating and cooling maintenance, repairs, and
                        installations.
                    </p>
                </div>
                <div>
                    <h2 className="font-semibold text-white">Contact</h2>
                    <ul className="mt-2 space-y-1 text-sm">
                        <li>
                            <a href={`tel:${business.phone}`} className="hover:text-white">
                                {formatPhone(business.phone)}
                            </a>
                        </li>
                        <li>
                            <a href={`mailto:${business.email}`} className="hover:text-white">
                                {business.email}
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="font-semibold text-white">Hours & area</h2>
                    <p className="mt-2 text-sm">{business.hours}</p>
                    <p className="mt-1 text-sm">{business.serviceArea}</p>
                </div>
                <div>
                    <h2 className="font-semibold text-white">Quick links</h2>
                    <ul className="mt-2 space-y-1 text-sm">
                        {navLinks.map((l) => (
                            <li key={l.href}>
                                <Link
                                    href={l.href}
                                    className="inline-block transition duration-200 hover:translate-x-1 hover:text-white"
                                >
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="border-t border-neutral-800 py-4 text-center text-xs text-neutral-400">
                © {business.name}. All rights reserved.
            </div>
        </footer>
    );
}
