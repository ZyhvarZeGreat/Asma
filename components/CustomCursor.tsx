"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      const finePointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      ).matches;
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!finePointer || reducedMotion) {
        cursor.style.display = "none";
        return;
      }

      gsap.set(cursor, { xPercent: -50, yPercent: -50 });

      const xTo = gsap.quickTo(cursor, "x", {
        duration: 0.6,
        ease: "power3",
      });
      const yTo = gsap.quickTo(cursor, "y", {
        duration: 0.6,
        ease: "power3",
      });

      const onMouseMove = (event: MouseEvent) => {
        xTo(event.clientX);
        yTo(event.clientY);
      };

      window.addEventListener("mousemove", onMouseMove);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
      };
    },
    { scope: cursorRef },
  );

  return <div ref={cursorRef} className="cursor" aria-hidden="true" />;
}
