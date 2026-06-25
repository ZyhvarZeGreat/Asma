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
      className={`absolute inset-0 overflow-hidden bg-[#2b0a0d]${className ? ` ${className}` : ""}`}
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
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-[#2b0a0d]/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#2b0a0d]/50 via-transparent to-[#2b0a0d]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2b0a0d]/55 via-transparent to-[#2b0a0d]/15" />
    </section>
  );
}
