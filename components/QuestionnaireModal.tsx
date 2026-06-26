"use client";

import { useEffect, useRef, useState } from "react";
import { JotformEmbed } from "@/components/JotformEmbed";
import { TypeformEmbed } from "@/components/TypeformEmbed";
import { loadCalendlyScript, openCalendlyPopup } from "@/lib/calendly";
import { CALENDLY_URL, JOTFORM_URL, TYPEFORM_URL } from "@/lib/links";
import {
  initialQuestionnaireAnswers,
  questionnaireIntro,
  questionnaireSteps,
  type QuestionnaireAnswers,
  type QuestionnaireField,
} from "@/lib/questionnaire";
import {
  submitQuestionnaire,
  submitQuestionnaireInBackground,
} from "@/lib/submitQuestionnaire";

type QuestionnaireModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type StepIndex = number;

function CalendlyBookButton({ className }: { className?: string }) {
  if (!CALENDLY_URL) return null;

  return (
    <button
      type="button"
      onClick={() => void openCalendlyPopup(CALENDLY_URL)}
      className={className}
    >
      Book a discovery call
    </button>
  );
}

export function QuestionnaireModal({ isOpen, onClose }: QuestionnaireModalProps) {
  const usesExternalForm = Boolean(TYPEFORM_URL || JOTFORM_URL);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<StepIndex>(0);
  const [answers, setAnswers] =
    useState<QuestionnaireAnswers>(initialQuestionnaireAnswers);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const totalSteps = questionnaireSteps.length + 1;
  const isIntro = step === 0;
  const questionIndex = step - 1;
  const currentStep = isIntro ? null : questionnaireSteps[questionIndex];
  const isLastStep = step === totalSteps - 1;

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    setVisible(false);
    const timeout = window.setTimeout(() => {
      setMounted(false);
      setStep(0);
      setAnswers(initialQuestionnaireAnswers);
      setSubmitted(false);
      setIsSubmitting(false);
      setSubmitError(null);
    }, 350);
    return () => window.clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    if (!mounted) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mounted, onClose]);

  useEffect(() => {
    if (visible && !submitted && !isIntro && !usesExternalForm) {
      inputRef.current?.focus();
    }
  }, [visible, step, submitted, isIntro, usesExternalForm]);

  useEffect(() => {
    if (isOpen && CALENDLY_URL) {
      void loadCalendlyScript();
    }
  }, [isOpen]);

  if (!mounted) return null;

  const currentValue = currentStep
    ? answers[currentStep.id as QuestionnaireField]
    : "";

  const canContinue = isIntro
    ? true
    : currentStep?.type === "choice"
      ? currentValue.length > 0
      : currentValue.trim().length > 0;

  const handleNext = async () => {
    if (!canContinue || isSubmitting) return;

    if (isLastStep) {
      if (CALENDLY_URL) {
        submitQuestionnaireInBackground(answers);
        onClose();
        void openCalendlyPopup(CALENDLY_URL);
        return;
      }

      setIsSubmitting(true);
      setSubmitError(null);

      try {
        await submitQuestionnaire(answers);
        setSubmitted(true);
      } catch (error) {
        setSubmitError(
          error instanceof Error
            ? error.message
            : "Failed to submit application.",
        );
      } finally {
        setIsSubmitting(false);
      }

      return;
    }

    setSubmitError(null);
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step === 0) return;
    setStep((prev) => prev - 1);
  };

  const updateAnswer = (value: string) => {
    if (!currentStep) return;
    setAnswers((prev) => ({
      ...prev,
      [currentStep.id]: value,
    }));
  };

  const handleTypeformSubmit = () => {
    onClose();

    if (!CALENDLY_URL) return;

    window.setTimeout(() => {
      void openCalendlyPopup(CALENDLY_URL);
    }, 400);
  };

  const modalWidthClass = usesExternalForm
    ? TYPEFORM_URL
      ? "max-w-[min(1040px,calc(100vw-3rem))]"
      : "max-w-[920px]"
    : "max-w-[680px]";
  const modalPaddingClass = usesExternalForm ? "p-0" : "p-8 md:p-10";
  const modalHeightClass =
    usesExternalForm && TYPEFORM_URL ? "h-[90vh] max-h-[90vh]" : "";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-6 ${
        visible ? "animate-overlay-in" : "animate-overlay-out"
      }`}
      role="presentation"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#0a0405]/82 backdrop-blur-md" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="questionnaire-title"
        className={`relative z-10 max-h-[90dvh] w-full overflow-y-auto rounded-3xl border border-white/[0.09] bg-glass-bg backdrop-blur-xl ${modalWidthClass} ${modalPaddingClass} ${modalHeightClass} ${
          visible ? "animate-modal-in" : "animate-modal-out"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close application"
          className={`absolute z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-base font-normal leading-none text-text-primary transition-colors hover:bg-white/5 ${
            usesExternalForm ? "right-4 top-4 bg-[#0a0405]/70" : "right-6 top-6"
          }`}
        >
          ×
        </button>

        {usesExternalForm ? (
          <div
            className={
              TYPEFORM_URL
                ? "h-full w-full"
                : "flex min-h-[min(78vh,720px)] flex-col"
            }
          >
            {TYPEFORM_URL ? (
              <TypeformEmbed
                className="h-full w-full"
                onSubmit={handleTypeformSubmit}
              />
            ) : (
              <JotformEmbed className="min-h-[min(78vh,720px)] w-full border-0 bg-transparent" />
            )}
            {CALENDLY_URL && !TYPEFORM_URL && (
              <div className="border-t border-white/10 px-6 py-4 text-center">
                <p className="text-[14px] font-normal text-text-muted">
                  Prefer to talk first?
                </p>
                <CalendlyBookButton className="mt-2 text-[15px] font-normal text-accent-rose transition-opacity hover:opacity-80" />
              </div>
            )}
          </div>
        ) : submitted ? (
          <div
            className="animate-title-in py-8 pr-8"
            style={{ animationDelay: "80ms" }}
          >
            <h2
              id="questionnaire-title"
              className="text-[clamp(2rem,4vw,2.75rem)] font-semibold text-text-primary"
            >
              Application received
            </h2>
            <p className="mt-4 text-[17px] font-normal leading-[1.7] text-text-primary/95">
              Thank you for applying to partner with ASMA Creativo. Our team
              will review your responses and be in touch soon.
            </p>
            <CalendlyBookButton className="mt-6 rounded-lg bg-bg-button px-6 py-3 text-[15px] font-normal text-text-primary transition-colors hover:bg-bg-button-hover" />
          </div>
        ) : (
          <>
            <div className="mb-8 flex items-center gap-2 pr-8">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <span
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    index <= step ? "bg-accent-rose" : "bg-white/15"
                  }`}
                />
              ))}
            </div>

            <div
              key={step}
              className="animate-title-in pr-8"
              style={{ animationDelay: "80ms" }}
            >
              {!isIntro && (
                <p className="mb-3 text-[15px] font-normal text-text-muted">
                  {step} / {questionnaireSteps.length}
                </p>
              )}

              {isIntro ? (
                <>
                  <h2
                    id="questionnaire-title"
                    className="text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-tight text-text-primary"
                  >
                    {questionnaireIntro.title}
                  </h2>
                  <div className="mt-6 space-y-4">
                    {questionnaireIntro.paragraphs.map((paragraph, index) => (
                      <p
                        key={paragraph}
                        className="animate-paragraph-in text-[17px] font-normal leading-[1.7] text-text-primary/95"
                        style={{ animationDelay: `${160 + index * 100}ms` }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h2
                    id="questionnaire-title"
                    className="text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-tight text-text-primary"
                  >
                    {currentStep?.question}
                  </h2>

                  <div className="mt-8">
                    {currentStep?.type === "choice" ? (
                      <div className="space-y-3">
                        {currentStep.options.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => updateAnswer(option)}
                            className={`block w-full rounded-xl border px-5 py-4 text-left text-[17px] font-normal transition-all ${
                              currentValue === option
                                ? "border-accent-rose bg-accent-rose/15 text-text-primary"
                                : "border-white/10 bg-white/[0.03] text-text-primary hover:border-white/20"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    ) : currentStep?.type === "textarea" ? (
                      <textarea
                        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                        value={currentValue}
                        onChange={(event) => updateAnswer(event.target.value)}
                        placeholder={currentStep.placeholder}
                        rows={5}
                        className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-[17px] font-normal text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent-rose/60"
                      />
                    ) : (
                      <input
                        ref={inputRef as React.RefObject<HTMLInputElement>}
                        type={currentStep?.type}
                        value={currentValue}
                        onChange={(event) => updateAnswer(event.target.value)}
                        placeholder={currentStep?.placeholder}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-[17px] font-normal text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent-rose/60"
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            handleNext();
                          }
                        }}
                      />
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="mt-10 flex flex-col gap-3">
              {submitError ? (
                <p className="text-[14px] font-normal leading-snug text-red-300">
                  {submitError}
                </p>
              ) : null}

              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 0 || isSubmitting}
                  className="text-[15px] font-normal text-text-muted transition-opacity disabled:opacity-30"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => void handleNext()}
                  disabled={!canContinue || isSubmitting}
                  className="rounded-lg bg-bg-button px-6 py-3 text-[15px] font-normal text-text-primary transition-colors hover:bg-bg-button-hover disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isSubmitting
                    ? "Sending..."
                    : isIntro
                      ? "Begin Application"
                      : isLastStep
                        ? "Submit"
                        : "Continue"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
