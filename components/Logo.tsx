/*

The True North logo mark (same artwork as app/icon.svg), reusable in the Navbar and Footer.
The snowflake spins slowly on hover when the parent has the `group` class.

*/
export default function Logo({ className = "h-9 w-9" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 64 64"
            className={className}
            aria-hidden="true"
            focusable="false"
        >
            <rect width="64" height="64" rx="14" fill="#dc2626" />
            <g
                className="logo-flake"
                fill="none"
                stroke="#ffffff"
                strokeWidth="4.5"
                strokeLinecap="round"
            >
                <path d="M32 12v40M14.7 22l34.6 20M14.7 42l34.6-20" />
                <path d="M26 15l6 5 6-5M26 49l6-5 6 5" />
            </g>
        </svg>
    );
}
