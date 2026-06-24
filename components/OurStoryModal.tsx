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
      className={`fixed inset-0 z-50 flex items-stretch justify-center p-0 md:items-center md:p-8 ${
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
        className={`story-glass relative z-10 flex h-full max-h-[100dvh] w-full flex-col overflow-y-auto max-md:rounded-none max-md:border-0 max-md:bg-transparent max-md:shadow-none md:max-h-[90dvh] md:max-w-[1040px] md:rounded-3xl ${
          visible ? "animate-modal-in" : "animate-modal-out"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close Our Story"
          className="absolute right-6 top-6 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-base font-normal leading-none text-text-primary transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-rose"
        >
          ×
        </button>

        <div className="flex flex-col md:grid md:grid-cols-[1fr_1px_1fr]">
          <div className="relative flex flex-col">
            <div className="relative z-10 flex items-center px-6 pb-4 pt-16 md:min-h-[360px] md:flex-1 md:px-16 md:pb-6 md:pt-12">
              <h2
                id="our-story-title"
                className="animate-title-in font-sans text-left text-[clamp(3rem,16vw,7.5rem)] font-light leading-[0.88] tracking-[-0.03em] text-text-primary md:text-[clamp(4rem,10vw,7.5rem)] lg:text-[120px]"
                style={{ animationDelay: "60ms" }}
              >
                <span className="block">Our</span>
                <span className="block">Story</span>
              </h2>
            </div>

            <p
              className="relative z-10 animate-title-in max-w-none px-6 pb-8 text-left font-sans text-[16px] font-light leading-snug text-text-tagline md:max-w-[280px] md:px-16 md:pb-8"
              style={{ animationDelay: "200ms" }}
            >
              {ourStory.tagline}
            </p>
          </div>

          <div className="story-divider hidden w-px self-stretch md:my-12 md:block" />

          <div className="border-t border-white/[0.1] px-6 py-8 md:border-t-0 md:px-12 md:py-12">
            <div className="space-y-6 md:max-h-[calc(78vh-7rem)] md:overflow-y-auto md:pr-4">
              {ourStory.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="animate-paragraph-in max-w-none font-sans text-[15px] font-normal leading-[1.75] text-text-tagline md:text-[16px]"
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
