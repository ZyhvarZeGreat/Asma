"use client";

import { ArrowButton } from "@/components/ui/ArrowButton";
import { site } from "@/lib/content";

type CTAButtonsProps = {
  onOurStoryClick: () => void;
  onStartProjectClick: () => void;
};

export function CTAButtons({
  onOurStoryClick,
  onStartProjectClick,
}: CTAButtonsProps) {
  return (
    <div className="space-y-4 max-md:space-y-3 md:space-y-5">
      <p className="max-w-full text-[clamp(0.8125rem,3.35vw,1.0625rem)] font-normal leading-[1.45] text-bg-button-hover max-md:max-w-[20rem] md:text-[clamp(1rem,4.25vw,1.5rem)] md:leading-[1.5]">
        {site.description.map((line) => (
          <span key={line} className="block max-md:whitespace-normal md:whitespace-nowrap">
            {line}
          </span>
        ))}
      </p>
      <div className="flex flex-col items-stretch gap-2.5 max-md:gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <ArrowButton
          label="Our Story"
          onClick={onOurStoryClick}
        />
        <ArrowButton
          label="Start Project"
          onClick={onStartProjectClick}
        />
      </div>
    </div>
  );
}
