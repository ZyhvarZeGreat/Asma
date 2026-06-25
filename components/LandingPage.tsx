"use client";

import { useState } from "react";
import { CTAButtons } from "@/components/CTAButtons";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
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
        className={`relative h-dvh overflow-hidden bg-bg-primary max-md:min-h-dvh max-md:h-auto max-md:overflow-y-auto ${
          isIntroActive ? "asma-page--loading" : ""
        }`}
      >
        <Hero />

        <div
          className={`relative z-10 flex h-full flex-col px-5 transition-opacity duration-700 ease-out max-md:gap-8 max-md:pt-8 max-md:pb-8 md:px-12 md:py-10 ${
            isIntroActive ? "pointer-events-none opacity-0" : "opacity-100"
          } ${isOurStoryOpen ? "pointer-events-none invisible" : ""}`}
        >
          <Header />

          <div className="relative min-h-0 flex-1 max-md:flex max-md:flex-col max-md:gap-8">
            <div className="relative z-20 max-md:static max-md:text-left md:absolute md:right-0 md:top-[28%] md:-translate-y-1/2 md:text-right lg:top-[26%]">
              <h1 className="text-[clamp(2.75rem,10vw+0.5rem,8.25rem)] leading-[0.95] tracking-[-0.02em] text-text-primary max-md:max-w-full md:whitespace-nowrap">
                <span className="font-black">ASMA</span>
                <span className="font-normal"> Creativo</span>
              </h1>
              <p className="mt-3 max-w-full text-balance text-[clamp(1rem,0.65rem+1.5vw,1.75rem)] font-medium leading-snug text-text-primary md:mt-5">
                {site.tagline}
              </p>
            </div>

            <div className="relative z-10 max-md:static md:absolute md:bottom-[26%] md:left-0 lg:bottom-[24%]">
              <CTAButtons
                onOurStoryClick={() => setIsOurStoryOpen(true)}
                onStartProjectClick={() => setIsQuestionnaireOpen(true)}
              />
            </div>

            <div className="relative z-10 max-md:static max-md:w-full md:absolute md:bottom-0 md:right-0 md:w-[min(330px,28vw)]">
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
