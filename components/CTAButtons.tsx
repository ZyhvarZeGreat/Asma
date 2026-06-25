"use client";

import { ArrowButton } from "@/components/ui/ArrowButton";
import { openCalendlyPopup } from "@/lib/calendly";
import { CALENDLY_URL, INTAKE_FORM_URL } from "@/lib/links";
import { site } from "@/lib/content";

type CTAButtonsProps = {
  onOurStoryClick: () => void;
  onStartProjectClick: () => void;
};

export function CTAButtons({
  onOurStoryClick,
  onStartProjectClick,
}: CTAButtonsProps) {
  const handleStartProject = () => {
    if (INTAKE_FORM_URL) {
      onStartProjectClick();
      return;
    }

    if (CALENDLY_URL) {
      void openCalendlyPopup(CALENDLY_URL);
      return;
    }

    onStartProjectClick();
  };

  return (
    <div className="space-y-5 max-md:space-y-4">
      <p className="max-w-full text-[clamp(0.9375rem,4.1vw,1.125rem)] font-normal leading-[1.5] text-text-primary md:max-w-[32rem]">
        {site.description.map((line) => (
          <span key={line} className="block">
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
          onClick={handleStartProject}
          className="max-md:w-full"
        />
      </div>
    </div>
  );
}
