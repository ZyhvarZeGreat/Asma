"use client";

import { useEffect, useRef, useState } from "react";
import { ourStory } from "@/lib/content";

type OurStoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function OurStoryModal({ isOpen, onClose }: OurStoryModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    setVisible(false);
    const timeout = window.setTimeout(() => setMounted(false), 350);
    return () => window.clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    if (!mounted) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (visible) {
      closeButtonRef.current?.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mounted, visible, onClose]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 ${
        visible ? "animate-overlay-in" : "animate-overlay-out"
      }`}
      role="presentation"
      onClick={onClose}
    >
      <div className="story-overlay absolute inset-0" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="our-story-title"
        className={`story-glass relative z-10 flex h-[min(72dvh,520px)] w-full max-w-[min(92vw,1014px)] flex-col overflow-hidden rounded-3xl max-md:max-h-[82dvh] ${
          visible ? "animate-modal-in" : "animate-modal-out"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close Our Story"
          className="absolute right-5 top-5 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/35 text-lg font-normal leading-none text-text-primary transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-rose md:right-6 md:top-6"
        >
          ×
        </button>

        <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div className="flex min-h-0 flex-col items-start justify-center border-b border-white/10 px-6 py-8 text-left md:border-b-0 md:border-r md:px-10 md:py-6 md:pl-12">
            <h2
              id="our-story-title"
              className="animate-title-in font-sans text-[clamp(3.5rem,16vw,6rem)] font-extrabold leading-[0.88] tracking-[-0.03em] text-text-primary md:text-[clamp(5rem,8vw,7.5rem)] lg:text-[120px]"
              style={{ animationDelay: "60ms" }}
            >
              <span className="block">Our</span>
              <span className="block">Story</span>
            </h2>

            <p
              className="animate-title-in mt-6 max-w-[16rem] font-sans text-[clamp(1rem,1.5vw,1.125rem)] font-normal leading-snug text-text-primary/90"
              style={{ animationDelay: "200ms" }}
            >
              {ourStory.tagline}
            </p>
          </div>

          <div className="flex min-h-0 flex-col justify-center overflow-y-auto px-6 py-6 md:px-12 md:py-6">
            <div className="space-y-5">
              {ourStory.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="animate-paragraph-in font-sans text-[14px] font-normal leading-[1.7] text-text-primary md:text-[15px]"
                  style={{ animationDelay: `${300 + index * 110}ms` }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
