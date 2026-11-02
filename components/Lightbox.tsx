/*

Full-screen image viewer built on the native <dialog> element (handles focus and Esc).
Closes on Esc, backdrop click, or the close button. Arrow keys and swipes move between images.

*/
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/data/gallery";

const SWIPE_MIN_PX = 50;

const navButton =
    "absolute top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-white";

export default function Lightbox({
    images,
    index,
    onClose,
    onNavigate,
}: {
    images: GalleryImage[];
    index: number | null;
    onClose: () => void;
    onNavigate: (index: number) => void;
}) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const touchStartX = useRef<number | null>(null);
    const isOpen = index !== null;

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (isOpen && !dialog.open) dialog.showModal();
        if (!isOpen && dialog.open) dialog.close();

        // Stop the page behind from scrolling while open
        document.documentElement.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.documentElement.style.overflow = "";
        };
    }, [isOpen]);

    if (index === null) {
        return <dialog ref={dialogRef} onClose={onClose} />;
    }

    const image = images[index];
    const count = images.length;
    const prev = () => onNavigate((index - 1 + count) % count);
    const next = () => onNavigate((index + 1) % count);

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            aria-label={image.alt}
            onKeyDown={(e) => {
                if (e.key === "ArrowLeft") prev();
                if (e.key === "ArrowRight") next();
            }}
            className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-black/90"
        >
            <div
                className="relative flex h-full w-full items-center justify-center p-4 sm:p-12"
                onClick={(e) => {
                    if (e.target === e.currentTarget) onClose();
                }}
                onTouchStart={(e) => {
                    touchStartX.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                    if (touchStartX.current === null) return;
                    const dx = e.changedTouches[0].clientX - touchStartX.current;
                    touchStartX.current = null;
                    if (dx > SWIPE_MIN_PX) prev();
                    if (dx < -SWIPE_MIN_PX) next();
                }}
            >
                <figure className="relative flex h-full w-full max-w-6xl flex-col">
                    <div className="relative flex-1">
                        <Image
                            key={image.id}
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(min-width: 1152px) 1152px, 100vw"
                            className="object-contain"
                        />
                    </div>
                    <figcaption className="mt-3 text-center text-sm text-neutral-200">
                        {image.alt}
                        <span className="ml-2 text-neutral-400">
                            {index + 1} / {count}
                        </span>
                    </figcaption>
                </figure>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    autoFocus
                    className="absolute top-3 right-3 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-white"
                >
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous image"
                    className={`${navButton} left-2 sm:left-4`}
                >
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={next}
                    aria-label="Next image"
                    className={`${navButton} right-2 sm:right-4`}
                >
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </dialog>
    );
}
