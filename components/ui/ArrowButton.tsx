"use client";

import { ArrowRight } from "./ArrowIcon";

const CHAR_STAGGER_OFFSET = 0.01;

type ArrowButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
};

export function ArrowButton({
  label,
  onClick,
  type = "button",
  className,
}: ArrowButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn-animate-chars btn-animate-chars--arrow group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-rose${className ? ` ${className}` : ""}`}
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

      <span className="relative z-[1] flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/30 bg-bg-button-hover">
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-px" />
      </span>
    </button>
  );
}
