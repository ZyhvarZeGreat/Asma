"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-8 ${
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
        className={`story-glass relative z-10 flex w-full max-w-[min(96vw,1306.97px)] flex-col overflow-hidden rounded-2xl sm:rounded-3xl max-md:max-h-[min(92dvh,100%)] md:h-[600px] md:max-h-[min(90dvh,600px)] ${
          visible ? "animate-modal-in" : "animate-modal-out"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 justify-end px-3 pt-3 md:hidden">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close Our Story"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 text-lg font-normal leading-none text-text-primary transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-rose"
          >
            ×
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto md:overflow-hidden">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Our Story"
            className="absolute right-5 top-5 z-30 hidden h-9 w-9 items-center justify-center rounded-full border border-white/35 text-lg font-normal leading-none text-text-primary transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-rose md:flex md:right-6 md:top-6"
          >
            ×
          </button>

          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,9fr)_minmax(0,11fr)] md:h-full md:overflow-hidden">
            <div className="relative flex min-h-[min(220px,32vh)] flex-col overflow-hidden border-b border-white/10 px-5 pb-6 pt-2 text-left sm:min-h-[240px] sm:px-6 md:min-h-0 md:h-full md:border-b-0 md:px-10 md:py-6 md:pl-12 md:pt-6">
              <Image
                src="/images/afrca.svg"
                alt=""
                width={387}
                height={423}
                aria-hidden="true"
                className="pointer-events-none absolute left-[calc(50%+70px)] top-1/2 h-[clamp(11rem,68%,20rem)] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.22] md:h-[min(74%,32rem)]"
              />

              <div className="relative z-10 flex min-h-0 flex-1 flex-col md:ml-[30px]">
                <div className="flex flex-1 items-center">
                  <h2
                    id="our-story-title"
                    className="animate-title-in font-sans text-[clamp(3rem,14vw,5rem)] font-medium leading-[0.9] tracking-[-0.03em] text-text-primary sm:text-[clamp(3.5rem,13vw,5.5rem)] md:text-[clamp(6rem,10vw,8.5rem)] lg:text-[140px]"
                    style={{ animationDelay: "60ms" }}
                  >
                    <span className="block">Our</span>
                    <span className="block">Story</span>
                  </h2>
                </div>

                <p
                  className="animate-title-in max-w-full shrink-0 font-sans text-[clamp(0.9375rem,3.5vw,1.125rem)] font-normal leading-[1.2] text-story-body sm:max-w-[16rem] md:-translate-y-[55px]"
                  style={{ animationDelay: "200ms" }}
                >
                  {ourStory.tagline.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <div className="flex min-h-0 flex-col justify-center px-5 py-5 pb-6 sm:px-6 sm:py-6 sm:pb-8 md:h-full md:overflow-y-auto md:px-8 md:py-8 md:pr-10">
              <div className="flex w-full items-stretch gap-6 md:gap-8">
                <div
                  className="story-divider hidden w-[3px] shrink-0 rounded-full md:block"
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1 space-y-5 md:space-y-6">
                  {ourStory.paragraphs.map((paragraph, index) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="story-body-copy animate-paragraph-in text-[15px] leading-[1.45] text-story-body md:text-[17px] md:leading-[1.48]"
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
      </div>
    </div>
  );
}
