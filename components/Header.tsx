import Image from "next/image";
import { assets, site } from "@/lib/content";

const headerTextClass =
  "font-sans text-[clamp(0.8125rem,0.45rem+1.15vw,1.375rem)] font-normal leading-[1.35] text-text-primary";

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={`flex w-full shrink-0 flex-wrap items-start justify-between gap-x-5 gap-y-3 sm:gap-x-6 lg:items-center${className ? ` ${className}` : ""}`}
    >
      <div className="flex min-w-0 max-w-full items-center gap-2.5 sm:gap-3 md:gap-4">
        <Image
          src={assets.logo}
          alt="ASMA Creativo logo"
          width={56}
          height={56}
          className="h-9 w-9 shrink-0 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14"
          sizes="(max-width: 640px) 36px, (max-width: 1024px) 48px, 56px"
        />
        <span className={`min-w-0 leading-[1.25] ${headerTextClass}`}>
          <span className="md:hidden">
            {site.headerTagline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </span>
          <span className="hidden md:inline">
            • {site.headerTagline.join(" ")}
          </span>
        </span>
      </div>
      <p
        className={`hidden min-w-0 max-w-full text-balance sm:max-w-[min(100%,22rem)] md:block lg:max-w-none lg:shrink-0 lg:text-right ${headerTextClass}`}
      >
        {site.launchNotice}
      </p>
      <button
        type="button"
        aria-label="Open menu"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/30 text-text-primary md:hidden"
        tabIndex={-1}
      >
        <span className="flex flex-col gap-[5px]" aria-hidden="true">
          <span className="block h-px w-4 bg-current" />
          <span className="block h-px w-4 bg-current" />
          <span className="block h-px w-4 bg-current" />
        </span>
      </button>
    </header>
  );
}
