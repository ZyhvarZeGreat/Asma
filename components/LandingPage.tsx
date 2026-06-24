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
        <Hero className={isOurStoryOpen ? "invisible" : undefined} />

        <div
          className={`relative z-10 flex h-full flex-col transition-opacity duration-700 ease-out max-md:gap-8 max-md:px-6 max-md:pt-8 max-md:pb-8 md:p-8 ${
            isIntroActive ? "pointer-events-none opacity-0" : "opacity-100"
          } ${isOurStoryOpen ? "invisible" : ""}`}
        >
          <Header />

          <div className="relative min-h-0 flex-1 max-md:flex max-md:flex-col max-md:gap-8">
            <div className="max-md:static max-md:translate-y-0 max-md:text-left md:absolute md:right-0 md:top-[24%] md:-translate-y-1/2 md:text-right lg:top-[34%]">
              <h1 className="text-[clamp(2.5rem,5.2vw,5.25rem)] leading-[1.05] tracking-[-0.02em] text-text-primary md:whitespace-nowrap">
                <span className="font-bold">ASMA</span>
                <span className="font-semibold"> Creativo</span>
              </h1>
              <p className="mt-4 text-[clamp(1.0625rem,1.5vw,1.4375rem)] font-normal leading-snug text-text-tagline">
                {site.tagline}
              </p>
            </div>

            <div className="max-md:static md:absolute md:bottom-[22%] md:left-0 lg:bottom-[20%]">
              <CTAButtons
                onOurStoryClick={() => setIsOurStoryOpen(true)}
                onStartProjectClick={() => setIsQuestionnaireOpen(true)}
              />
            </div>

            <div className="max-md:static max-md:w-full md:absolute md:bottom-0 md:right-0">
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
