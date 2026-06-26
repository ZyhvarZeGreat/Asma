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
    <div className="space-y-5 max-md:space-y-4">
      <p className="max-w-full text-[clamp(calc(1.125rem_+_1px),calc(4.75vw_+_1px),calc(1.5rem_+_1px))] font-normal leading-[1.45] text-bg-button-hover">
        {site.description.map((line) => (
          <span key={line} className="block whitespace-nowrap">
            {line}
          </span>
        ))}
      </p>
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <ArrowButton
          label="Our Story"
          onClick={onOurStoryClick}
          className="max-md:w-full"
        />
        <ArrowButton
          label="Start Project"
          onClick={onStartProjectClick}
          className="max-md:w-full"
        />
      </div>
    </div>
  );
}
