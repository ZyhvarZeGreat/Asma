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
      className="w-full overflow-hidden rounded-2xl border border-white/25 bg-black/25 backdrop-blur-md"
      aria-label="Services"
    >
      <div className="relative overflow-hidden px-5 pb-4 pt-4">
        <p className="relative z-10 max-w-[16rem] text-[clamp(0.9375rem,1.15vw,1.0625rem)] font-medium leading-snug text-text-primary">
          {site.agencyLabel}
        </p>
        <p className="relative z-10 mt-2 max-w-[18rem] text-[clamp(0.8125rem,1vw,0.9375rem)] font-normal leading-relaxed text-text-primary/75">
          {site.description}
        </p>
        <WavyLines className="pointer-events-none absolute -right-3 top-0 h-[5.5rem] w-[78%] opacity-100" />
      </div>

      <div className="mx-5 border-t border-white/25" aria-hidden="true" />

      <div className="px-5 py-4">
        <div
          className="grid grid-cols-1 gap-x-8 gap-y-2 text-[clamp(0.875rem,1vw,0.9375rem)] font-normal leading-[1.45] text-text-primary/95 md:grid-cols-2"
          key={activeTab}
        >
          {current.columns.map((column, columnIndex) => (
            <ul key={columnIndex} className="space-y-2">
              {column.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="mx-5 border-t border-white/25" aria-hidden="true" />

      <div className="flex flex-wrap items-center justify-center gap-3 px-5 py-4">
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
