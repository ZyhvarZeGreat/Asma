import Image from "next/image";
import { assets, site } from "@/lib/content";

export function Header() {
  return (
    <header className="flex shrink-0 items-center justify-between max-md:flex-col max-md:items-start max-md:gap-4">
      <div className="flex items-center gap-3">
        <Image
          src={assets.logo}
          alt="ASMA Creativo logo"
          width={40}
          height={40}
          className="h-10 w-10"
        />
        <span className="font-sans text-[clamp(0.9375rem,1.4vw,1.125rem)] font-normal leading-snug text-text-primary">
          • {site.headerTagline}
        </span>
      </div>
      <p className="font-sans text-[clamp(0.9375rem,1.4vw,1.125rem)] font-normal leading-snug text-text-primary max-md:max-w-full max-md:text-left">
        {site.launchNotice}
      </p>
    </header>
  );
}
