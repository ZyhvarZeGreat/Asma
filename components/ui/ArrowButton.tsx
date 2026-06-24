"use client";

import { ArrowRight } from "./ArrowIcon";

const CHAR_STAGGER_OFFSET = 0.01;

type ArrowButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function ArrowButton({
  label,
  onClick,
  type = "button",
}: ArrowButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="btn-animate-chars group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-rose"
    >
      <div className="btn-animate-chars__bg" aria-hidden="true" />

      <span data-button-animate-chars className="btn-animate-chars__text">
        {[...label].map((char, index) => (
          <span
            key={`${label}-${index}`}
            style={{ transitionDelay: `${index * CHAR_STAGGER_OFFSET}s` }}
            className={char === " " ? "whitespace-pre" : undefined}
          >
            {char}
          </span>
        ))}
      </span>

      <span className="relative z-[1] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-white/30">
        <ArrowRight className="h-2.5 w-2.5 transition-transform group-hover:translate-x-px" />
      </span>
    </button>
  );
}
