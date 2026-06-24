import Image from "next/image";
import { assets, site } from "@/lib/content";

export function Header() {
  return (
    <header className="flex shrink-0 items-center justify-between max-md:flex-col max-md:items-start max-md:gap-4">
      <div className="flex items-center gap-2">
        <Image
          src={assets.logo}
          alt="ASMA Creativo logo"
          width={24}
          height={26}
          className="h-[26px] w-6"
        />
        <span className="font-sans text-[clamp(0.875rem,2.5vw,1.25rem)] font-normal leading-none text-text-tagline">
          • {site.location}
        </span>
      </div>
      <p className="font-sans text-[clamp(0.875rem,2.5vw,1.25rem)] font-normal leading-none text-text-tagline max-md:max-w-full max-md:text-left">
        {site.launchNotice}
      </p>
    </header>
  );
}
