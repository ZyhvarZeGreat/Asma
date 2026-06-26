"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { assets } from "@/lib/content";

type HeroProps = {
  className?: string;
};

const SLIDE_DURATION = 5;
const FADE_DURATION = 1.5;

export function Hero({ className }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const slides = gsap.utils.toArray<HTMLElement>(".hero-slide", container);
      if (slides.length < 2) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(slides, { opacity: 0 });
        gsap.set(slides[0], { opacity: 1 });
        return;
      }

      gsap.set(slides, { opacity: 0 });
      gsap.set(slides[0], { opacity: 1 });

      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.inOut" } });

      slides.forEach((_, index) => {
        const current = slides[index];
        const next = slides[(index + 1) % slides.length];

        tl.to(current, { opacity: 0, duration: FADE_DURATION })
          .to(next, { opacity: 1, duration: FADE_DURATION }, "<")
          .to({}, { duration: SLIDE_DURATION });
      });

      return () => {
        tl.kill();
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className={`absolute inset-0 z-0 overflow-hidden bg-bg-primary max-md:inset-x-0 max-md:top-0 max-md:bottom-auto max-md:h-[min(40vh,340px)] max-md:min-h-[240px] max-md:bg-bg-wine${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      {assets.heroSlides.map((src, index) => (
        <div
          key={src}
          className="hero-slide absolute inset-0 opacity-0"
          aria-hidden="true"
        >
          <Image
            src={src}
            alt=""
            fill
            priority={index === 0}
            className="object-cover object-[center_20%] max-md:object-[center_15%] md:object-center"
            sizes="100vw"
          />
        </div>
      ))}

      <div
        className="absolute inset-0 bg-black/40 md:bg-black/50"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-b from-transparent via-bg-wine/70 to-bg-wine md:hidden"
        aria-hidden="true"
      />
    </section>
  );
}
