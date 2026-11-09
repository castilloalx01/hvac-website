/*

Scroll reveal wrapper. Content starts hidden (see .reveal in globals.css) and animates in
the first time it scrolls into view.

  variant: "fade-up" | "fade-left" | "fade-right" | "fade-in"
  delay:   milliseconds to wait before animating (use for staggering cards)

Without JavaScript, a <noscript> rule in the layout keeps everything visible.

*/
"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export type RevealVariant = "fade-up" | "fade-left" | "fade-right" | "fade-in";

export default function Reveal({
    children,
    variant = "fade-up",
    delay = 0,
    as: Tag = "div",
    className = "",
}: {
    children: ReactNode;
    variant?: RevealVariant;
    delay?: number;
    as?: "div" | "li" | "section" | "figure";
    className?: string;
}) {
    const ref = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        // Old browsers: just show the content
        if (typeof IntersectionObserver === "undefined") {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setVisible(true);
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect(); // animate once
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;

    return (
        <Tag
            ref={ref as never}
            style={style}
            className={`reveal reveal-${variant} ${visible ? "is-visible" : ""} ${className}`}
        >
            {children}
        </Tag>
    );
}
