"use client";

const CHAR_STAGGER_OFFSET = 0.01;

type StaggerButtonProps = {
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  variant?: "default" | "tab";
  type?: "button" | "submit";
};

export function StaggerButton({
  label,
  onClick,
  isActive = false,
  variant = "default",
  type = "button",
}: StaggerButtonProps) {
  const isTab = variant === "tab";

  return (
    <button
      type={type}
      onClick={onClick}
      aria-pressed={isTab ? isActive : undefined}
      className={`btn-animate-chars group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-rose ${
        isTab ? "btn-animate-chars--tab" : ""
      } ${isTab && isActive ? "btn-animate-chars--tab-active" : ""}`}
    >
      {!isTab || !isActive ? (
        <div className="btn-animate-chars__bg" aria-hidden="true" />
      ) : null}

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
    </button>
  );
}
