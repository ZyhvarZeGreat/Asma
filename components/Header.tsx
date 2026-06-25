import Image from "next/image";
import { assets, site } from "@/lib/content";

const headerTextClass =
  "font-sans text-[clamp(0.8125rem,0.45rem+1.15vw,1.375rem)] font-normal leading-[1.35] text-text-primary";

export function Header() {
  return (
    <header className="flex w-full shrink-0 flex-wrap items-start justify-between gap-x-5 gap-y-3 sm:gap-x-6 lg:items-center">
      <div className="flex min-w-0 max-w-full items-center gap-2.5 sm:gap-3 md:gap-4">
        <Image
          src={assets.logo}
          alt="ASMA Creativo logo"
          width={56}
          height={56}
          className="h-9 w-9 shrink-0 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14"
          sizes="(max-width: 640px) 36px, (max-width: 1024px) 48px, 56px"
        />
        <span className={`min-w-0 text-balance ${headerTextClass}`}>
          • {site.headerTagline}
        </span>
      </div>
      <p
        className={`min-w-0 max-w-full text-balance sm:max-w-[min(100%,22rem)] lg:max-w-none lg:shrink-0 lg:text-right ${headerTextClass}`}
      >
        {site.launchNotice}
      </p>
    </header>
  );
}
