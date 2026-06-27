"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type LandingHeroTitleProps = {
  isActive: boolean;
};

const OPEN_DURATION = 1.25;
const STAGGER_CHAR = 0.025;

const ASMA_CHARS = [...("ASMA" as const)];
const CREATIVO_CHARS = [...("Creativo" as const)];

export function LandingHeroTitle({ isActive }: LandingHeroTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const title = titleRef.current;
      if (!title || !isActive) return;

      const letters = title.querySelectorAll<HTMLElement>(
        ".landing-hero-title__letter",
      );
      if (!letters.length) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(letters, { yPercent: 0 });
        return;
      }

      gsap.from(letters, {
        yPercent: 100,
        duration: OPEN_DURATION,
        ease: "expo.out",
        stagger: STAGGER_CHAR,
      });
    },
    { scope: titleRef, dependencies: [isActive] },
  );

  return (
    <h1
      ref={titleRef}
      className="landing-hero-title max-w-full text-[clamp(3.1rem,14vw,8.25rem)] leading-[0.92] tracking-[-0.02em] text-text-primary min-[400px]:text-[clamp(3.4rem,13.5vw,8.25rem)] md:text-[clamp(2.5rem,11vw,6.75rem)] min-[400px]:md:text-[clamp(2.4rem,10.5vw,6.75rem)] md:whitespace-nowrap"
    >
      <span className="landing-hero-title__line font-black max-md:block md:inline-flex">
        {ASMA_CHARS.map((char, index) => (
          <span
            key={`asma-${char}-${index}`}
            className="landing-hero-title__letter"
          >
            {char}
          </span>
        ))}
      </span>
      <span className="landing-hero-title__line font-normal max-md:block md:ml-[0.12em] md:inline-flex">
        {CREATIVO_CHARS.map((char, index) => (
          <span
            key={`creativo-${char}-${index}`}
            className="landing-hero-title__letter"
          >
            {char}
          </span>
        ))}
      </span>
    </h1>
  );
}
