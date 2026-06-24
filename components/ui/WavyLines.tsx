type WavyLinesProps = {
  className?: string;
  variant?: "card" | "subtle";
};

export function WavyLines({ className, variant = "card" }: WavyLinesProps) {
  const strokeA = variant === "card" ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.12)";
  const strokeB = variant === "card" ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.08)";
  const strokeC = variant === "card" ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.06)";

  return (
    <svg
      className={className}
      viewBox="0 0 280 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 88 C45 72 90 96 135 80 C180 64 225 88 280 72"
        stroke={strokeA}
        strokeWidth="1.25"
      />
      <path
        d="M0 64 C50 48 100 72 150 56 C200 40 250 64 280 48"
        stroke={strokeB}
        strokeWidth="1.25"
      />
      <path
        d="M0 40 C55 24 110 48 165 32 C220 16 260 40 280 28"
        stroke={strokeC}
        strokeWidth="1.25"
      />
      <path
        d="M0 104 C60 92 120 108 180 96 C240 84 270 100 280 94"
        stroke={strokeC}
        strokeWidth="1"
      />
    </svg>
  );
}
