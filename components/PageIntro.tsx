"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { assets, site } from "@/lib/content";

type PageIntroProps = {
  onComplete: () => void;
};

const OPEN_DURATION = 1.25;
const EXPAND_DURATION = 2;
const STAGGER_CHAR = 0.025;

export function PageIntro({ onComplete }: PageIntroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const onCompleteRef = useRef(onComplete);
  const hasFinishedRef = useRef(false);

  onCompleteRef.current = onComplete;

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container || hasFinishedRef.current) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        hasFinishedRef.current = true;
        onCompleteRef.current();
        return;
      }

      const loadingLetter = container.querySelectorAll(".asma-intro__letter");
      const box = container.querySelectorAll(".asma-intro__loader-box");
      const growingImage = container.querySelectorAll(".asma-intro__growing-image");
      const headingStart = container.querySelectorAll(".asma-intro__h1-start");
      const headingEnd = container.querySelectorAll(".asma-intro__h1-end");
      const coverImageExtra = container.querySelectorAll(
        ".asma-intro__cover-image-extra",
      );
      const navLinks = container.querySelectorAll(".asma-intro__nav a");

      container.classList.remove("is--pending");

      const tl = gsap.timeline({
        defaults: {
          ease: "expo.inOut",
        },
        onComplete: () => {
          if (hasFinishedRef.current) return;
          hasFinishedRef.current = true;
          onCompleteRef.current();
        },
      });

      if (loadingLetter.length) {
        tl.from(loadingLetter, {
          yPercent: 100,
          stagger: STAGGER_CHAR,
          duration: OPEN_DURATION,
        });
      }

      if (box.length) {
        tl.fromTo(
          box,
          { width: "0em" },
          { width: "1em", duration: OPEN_DURATION },
          "<1.25",
        );
      }

      if (growingImage.length) {
        tl.fromTo(
          growingImage,
          { width: "0%" },
          { width: "100%", duration: OPEN_DURATION },
          "<",
        );
      }

      if (headingStart.length) {
        tl.fromTo(
          headingStart,
          { x: "0em" },
          { x: "-0.05em", duration: OPEN_DURATION },
          "<",
        );
      }

      if (headingEnd.length) {
        tl.fromTo(
          headingEnd,
          { x: "0em" },
          { x: "0.05em", duration: OPEN_DURATION },
          "<",
        );
      }

      if (coverImageExtra.length) {
        tl.fromTo(
          coverImageExtra,
          { opacity: 1 },
          {
            opacity: 0,
            duration: 0.05,
            ease: "none",
            stagger: 0.5,
          },
          "-=0.05",
        );
      }

      if (growingImage.length) {
        tl.to(
          growingImage,
          {
            width: "100vw",
            height: "100dvh",
            duration: EXPAND_DURATION,
          },
          "<1.25",
        );
      }

      if (box.length) {
        tl.to(
          box,
          {
            width: "110vw",
            duration: EXPAND_DURATION,
          },
          "<",
        );
      }

      if (navLinks.length) {
        tl.from(
          navLinks,
          {
            yPercent: 100,
            duration: OPEN_DURATION,
            ease: "expo.out",
            stagger: 0.1,
          },
          "<1.2",
        );
      }

      tl.to(
        container,
        {
          opacity: 0,
          duration: 0.7,
          ease: "power2.inOut",
        },
        "+=0.5",
      );

      return () => {
        if (hasFinishedRef.current) return;
        tl.kill();
      };
    },
    { scope: containerRef, dependencies: [] },
  );

  return (
    <section
      ref={containerRef}
      className="asma-intro is--loading is--pending"
      aria-hidden="true"
    >
      <div className="asma-intro__loader">
        <div className="asma-intro__h1">
          <div className="asma-intro__h1-start">
            <span className="asma-intro__letter">A</span>
            <span className="asma-intro__letter">S</span>
          </div>

          <div className="asma-intro__loader-box">
            <div className="asma-intro__loader-box-inner">
              <div className="asma-intro__growing-image">
                <div className="asma-intro__growing-image-wrap">
                  <img
                    className="asma-intro__cover-image-extra is--1"
                    src={assets.hero}
                    alt=""
                    loading="eager"
                  />
                  <img
                    className="asma-intro__cover-image-extra is--2"
                    src={assets.hero}
                    alt=""
                    loading="eager"
                  />
                  <img
                    className="asma-intro__cover-image-extra is--3"
                    src={assets.hero}
                    alt=""
                    loading="eager"
                  />
                  <img
                    className="asma-intro__cover-image"
                    src={assets.hero}
                    alt=""
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="asma-intro__h1-end">
            <span className="asma-intro__letter">M</span>
            <span className="asma-intro__letter">A</span>
          </div>
        </div>
      </div>

      <div className="asma-intro__content">
        <div className="asma-intro__top">
          <nav className="asma-intro__nav">
            <div className="asma-intro__nav-start">
              <a href="#" className="asma-intro__nav-link" tabIndex={-1}>
                ASMA Creativo ©
              </a>
            </div>
            <div className="asma-intro__nav-end">
              <a href="#" className="asma-intro__nav-link" tabIndex={-1}>
                {site.launchNotice}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}
