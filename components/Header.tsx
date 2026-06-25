import Image from "next/image";
import { assets, site } from "@/lib/content";

export function Header() {
  return (
    <header className="flex shrink-0 items-center justify-between max-md:flex-col max-md:items-start max-md:gap-4">
      <div className="flex items-center gap-4">
        <Image
          src={assets.logo}
          alt="ASMA Creativo logo"
          width={56}
          height={56}
          className="h-12 w-12 md:h-14 md:w-14"
        />
        <span className="font-sans text-[clamp(1.0625rem,1.85vw,1.375rem)] font-normal leading-snug text-text-primary">
          • {site.headerTagline}
        </span>
      </div>
      <p className="font-sans text-[clamp(1.0625rem,1.85vw,1.375rem)] font-normal leading-snug text-text-primary max-md:max-w-full max-md:text-left">
        {site.launchNotice}
      </p>
    </header>
  );
}
