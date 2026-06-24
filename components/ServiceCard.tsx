"use client";

import { useState } from "react";
import { services, site, type ServiceTab } from "@/lib/content";
import { WavyLines } from "@/components/ui/WavyLines";
import { StaggerButton } from "@/components/ui/StaggerButton";

export function ServiceCard() {
  const [activeTab, setActiveTab] = useState<ServiceTab>("branding");
  const current = services[activeTab];

  return (
    <aside
      className="w-full overflow-hidden rounded-2xl border border-white/[0.1] bg-glass-bg backdrop-blur-xl md:max-lg:w-[min(360px,calc(100vw-4rem))] lg:w-[392px]"
      aria-label="Services"
    >
      <div className="relative min-h-[112px] overflow-hidden px-6 pb-6 pt-6">
        <p className="relative z-10 max-w-[260px] text-[14px] font-normal leading-snug text-text-primary">
          {site.agencyLabel}
        </p>
        <p className="relative z-10 mt-4 max-w-[280px] text-[12px] font-normal leading-relaxed text-text-primary/70">
          {site.description}
        </p>
        <WavyLines className="pointer-events-none absolute -right-3 top-0 h-[112px] w-[78%] opacity-100" />
      </div>

      <div className="mx-6 border-t border-white/10" aria-hidden="true" />

      <div className="min-h-[168px] px-6 py-6">
        <div
          className="grid grid-cols-1 gap-x-12 gap-y-4 text-[14px] font-normal leading-[1.6] text-text-primary/95 md:grid-cols-2"
          key={activeTab}
        >
          {current.columns.map((column, columnIndex) => (
            <ul key={columnIndex} className="space-y-4">
              {column.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="mx-6 border-t border-white/10" aria-hidden="true" />

      <div className="flex flex-wrap items-center justify-center gap-4 px-6 py-6">
        <StaggerButton
          label={services.branding.label}
          isActive={activeTab === "branding"}
          variant="tab"
          onClick={() => setActiveTab("branding")}
        />
        <span className="h-4 w-px bg-white/25" aria-hidden="true" />
        <StaggerButton
          label={services.marketing.label}
          isActive={activeTab === "marketing"}
          variant="tab"
          onClick={() => setActiveTab("marketing")}
        />
      </div>
    </aside>
  );
}
