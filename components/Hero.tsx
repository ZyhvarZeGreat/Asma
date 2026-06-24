import Image from "next/image";
import { assets } from "@/lib/content";

type HeroProps = {
  className?: string;
};

export function Hero({ className }: HeroProps) {
  return (
    <section
      className={`absolute inset-0 overflow-hidden${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      <Image
        src={assets.hero}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0405]/80 via-[#0a0405]/35 to-[#0a0405]/55 lg:from-[#0a0405]/75 lg:via-[#0a0405]/25 lg:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0405]/85 via-[#0a0405]/25 to-[#0a0405]/20 lg:from-[#0a0405]/70 lg:via-transparent lg:to-[#0a0405]/15" />
    </section>
  );
}
