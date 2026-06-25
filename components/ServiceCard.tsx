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
      <div className="relative overflow-hidden px-4 pb-3 pt-3">
        <p className="relative z-10 max-w-[14rem] text-[clamp(0.875rem,1.05vw,1rem)] font-medium leading-snug text-text-primary">
          {site.agencyLabel}
        </p>
        <p className="relative z-10 mt-1.5 max-w-[18rem] text-[clamp(0.75rem,0.95vw,0.875rem)] font-normal leading-[1.45] text-text-primary/75">
          {site.description.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <WavyLines className="pointer-events-none absolute -right-3 top-0 h-[4.25rem] w-[78%] opacity-100" />
      </div>

      <div className="mx-4 border-t border-white/25" aria-hidden="true" />

      <div className="px-4 py-3">
        <div
          className="grid grid-cols-1 gap-x-6 gap-y-1.5 text-[clamp(0.8125rem,0.95vw,0.875rem)] font-normal leading-[1.4] text-text-primary/95 md:grid-cols-2"
          key={activeTab}
        >
          {current.columns.map((column, columnIndex) => (
            <ul key={columnIndex} className="space-y-1.5">
              {column.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="mx-4 border-t border-white/25" aria-hidden="true" />

      <div className="flex flex-wrap items-center justify-center gap-2.5 px-4 py-3">
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
