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
    <div className="space-y-6">
      <p className="max-w-[320px] text-[17px] font-normal leading-[1.7] text-text-primary/95 max-md:max-w-none">
        {site.description}
      </p>
      <div className="flex items-center gap-4 max-md:flex-col max-md:items-stretch">
        <ArrowButton label="Our Story" onClick={onOurStoryClick} />
        <ArrowButton label="Start Project" onClick={handleStartProject} />
      </div>
    </div>
  );
}
