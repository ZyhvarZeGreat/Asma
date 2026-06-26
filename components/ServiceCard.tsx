"use client";

import { useState } from "react";
import { services, site, type ServiceTab } from "@/lib/content";
import { WavyLines } from "@/components/ui/WavyLines";
import { StaggerButton } from "@/components/ui/StaggerButton";

export function ServiceCard() {
  const [activeTab, setActiveTab] = useState<ServiceTab | null>(null);
  const current = activeTab ? services[activeTab] : null;
  const isMarketingView = activeTab === "marketing";
  const topSectionFlex = isMarketingView ? "flex-[7]" : "flex-[3]";
  const bottomSectionFlex = isMarketingView ? "flex-[3]" : "flex-[2]";

  return (
    <aside
      className="flex w-full max-w-[497px] flex-col overflow-hidden rounded-2xl border-2 border-white/25 bg-transparent max-md:min-h-[240px] md:h-[280px] md:w-[497px] md:max-w-none md:border md:border-white/25"
      aria-label="Services"
    >
      <div className={`flex min-h-0 ${topSectionFlex} flex-col overflow-hidden`}>
        {!current ? (
          <div className="relative flex flex-1 flex-col justify-center overflow-hidden pr-4 pl-6 max-md:py-3 md:pr-5 md:pl-7">
            <p className="relative z-10 text-left text-[clamp(1.0625rem,4.5vw,1.625rem)] font-normal leading-[1.2] text-text-primary">
              {site.agencyLabel.map((line) => (
                <span
                  key={line}
                  className="block max-md:whitespace-normal md:whitespace-nowrap"
                >
                  {line}
                </span>
              ))}
            </p>
            <WavyLines className="pointer-events-none absolute -right-3 top-1/2 h-[4.25rem] w-[78%] -translate-y-1/2 opacity-100 max-md:opacity-60" />
          </div>
        ) : (
          <div className="flex flex-1 flex-col justify-center overflow-hidden py-3 pr-4 pl-6 md:pr-5 md:pl-7">
            <div
              className="grid grid-cols-2 content-start gap-x-4 gap-y-1.5 text-[clamp(0.8125rem,3.6vw,1rem)] font-normal leading-[1.35] text-text-primary max-[360px]:grid-cols-1 md:gap-x-6"
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
        )}
      </div>

      <div
        className="mx-4 h-0 shrink-0 border-t-2 border-white/25 md:mx-5 md:border-t md:border-white/25"
        aria-hidden="true"
      />

      <div
        className={`flex min-h-0 shrink-0 ${bottomSectionFlex} flex-col justify-start px-4 pt-4 pb-3 md:px-5 md:pt-7 md:pb-3`}
      >
        <div className="flex items-center text-[clamp(1.125rem,5.5vw,1.5rem)] leading-none md:text-[24px]">
          <StaggerButton
            label={services.branding.label}
            isActive={activeTab === "branding"}
            variant="tab"
            className="mr-1"
            onClick={() => setActiveTab("branding")}
          />
          <span
            className="mx-4 h-[1.125em] w-0.5 shrink-0 bg-white/25 md:mx-7 md:w-px md:bg-white/25"
            aria-hidden="true"
          />
          <StaggerButton
            label={services.marketing.label}
            isActive={activeTab === "marketing"}
            variant="tab"
            className="ml-1"
            onClick={() => setActiveTab("marketing")}
          />
        </div>
      </div>
    </aside>
  );
}
