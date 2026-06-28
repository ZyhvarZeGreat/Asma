"use client";

import { useState } from "react";
import { CTAButtons } from "@/components/CTAButtons";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LandingHeroTitle } from "@/components/LandingHeroTitle";
import { OurStoryModal } from "@/components/OurStoryModal";
import { PageIntro } from "@/components/PageIntro";
import { QuestionnaireModal } from "@/components/QuestionnaireModal";
import { ServiceCard } from "@/components/ServiceCard";
import { site } from "@/lib/content";

export function LandingPage() {
  const [isOurStoryOpen, setIsOurStoryOpen] = useState(false);
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  const isIntroActive = !introComplete;

  return (
    <>
      {!introComplete && (
        <PageIntro onComplete={() => setIntroComplete(true)} />
      )}

      <main
        className={`relative min-h-dvh bg-bg-primary max-md:bg-bg-wine max-md:h-auto max-md:overflow-x-hidden max-md:overflow-y-auto md:h-dvh md:overflow-hidden ${
          isIntroActive ? "asma-page--loading" : ""
        }`}
      >
        <Hero isActive={introComplete} />

        <div
          className={`relative z-10 flex min-h-dvh flex-col transition-opacity duration-700 ease-out max-md:min-h-0 max-md:px-[20px] max-md:pb-[max(24px,env(safe-area-inset-bottom))] max-md:pt-[24px] md:gap-0 md:px-[78px] md:py-10 ${
            isIntroActive ? "pointer-events-none opacity-0" : "opacity-100"
          } ${isOurStoryOpen ? "pointer-events-none invisible" : ""}`}
        >
          <Header className="max-md:absolute max-md:inset-x-0 max-md:top-0 max-md:z-30 max-md:px-[20px] max-md:pt-[24px]" />

          {/* Mobile: hero band on top, wine background below; title overlaps hero fade */}
          <div className="relative flex min-h-0 flex-1 flex-col max-md:gap-3 max-md:pt-[calc(min(40vh,340px)-2.75rem)] md:block">
            <div className="relative z-20 order-1 w-full text-left max-md:-mt-[calc(3.5rem+15px)] md:absolute md:right-0 md:top-[28%] md:-translate-y-[calc(50%-95px)] md:mt-0 md:text-right lg:top-[26%]">
              <LandingHeroTitle isActive={introComplete} />
              <p className="mt-2 max-w-full text-[clamp(1.125rem,5vw,2.5rem)] font-normal leading-[1.2] text-bg-button-hover min-[400px]:mt-2.5 md:mt-5">
                {site.tagline.map((line) => (
                  <span key={line} className="block max-md:whitespace-normal">
                    {line}
                  </span>
                ))}
              </p>
            </div>

            <div className="relative z-10 order-2 w-full max-md:bg-bg-wine md:absolute md:bottom-[26%] md:left-0 lg:bottom-[24%]">
              <CTAButtons
                onOurStoryClick={() => setIsOurStoryOpen(true)}
                onStartProjectClick={() => setIsQuestionnaireOpen(true)}
              />
            </div>

            <div className="relative z-10 order-3 w-full max-md:mt-[10px] md:absolute md:bottom-0 md:right-0 md:w-[497px]">
              <ServiceCard />
            </div>
          </div>
        </div>

        <OurStoryModal
          isOpen={isOurStoryOpen}
          onClose={() => setIsOurStoryOpen(false)}
        />

        <QuestionnaireModal
          isOpen={isQuestionnaireOpen}
          onClose={() => setIsQuestionnaireOpen(false)}
        />
      </main>
    </>
  );
}
