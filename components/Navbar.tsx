import Link from "next/link";

const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/book", label: "Book" },
];

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <Link href="/" className="text-xl font-bold text-blue-700">
                    CoolAir HVAC
                </Link>
                <ul className="hidden gap-6 text-sm font-medium text-gray-700 sm:flex">
                    {links.map((l) => (
                        <li key={l.href}>
                            <Link href={l.href} className="hover:text-blue-600">
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <a
                    href="tel:+15555555555"
                    className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                >
                    Call now
                </a>
            </nav>
        </header>
    );
}
