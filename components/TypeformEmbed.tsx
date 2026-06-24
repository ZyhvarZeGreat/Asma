"use client";

import { useEffect, useRef } from "react";
import { extractTypeformId, TYPEFORM_URL } from "@/lib/links";

type TypeformEmbedProps = {
  className?: string;
  onSubmit?: () => void;
};

const EMBED_SCRIPT_ID = "typeform-embed-script";

declare global {
  interface Window {
    tf?: {
      load: () => void;
    };
  }
}

function loadTypeformEmbedScript(): Promise<void> {
  const existing = document.getElementById(EMBED_SCRIPT_ID);
  if (existing) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = EMBED_SCRIPT_ID;
    script.src = "https://embed.typeform.com/next/embed.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Typeform embed"));
    document.body.appendChild(script);
  });
}

function syncTypeformHeight(container: HTMLDivElement): void {
  const height = container.clientHeight;
  if (height <= 0) return;

  const widget = container.firstElementChild as HTMLElement | null;
  if (widget) {
    widget.style.width = "100%";
    widget.style.height = `${height}px`;
    widget.style.minHeight = `${height}px`;
  }

  const iframe = container.querySelector("iframe");
  if (iframe) {
    iframe.style.width = "100%";
    iframe.style.height = `${height}px`;
    iframe.style.minHeight = `${height}px`;
  }
}

export function TypeformEmbed({ className, onSubmit }: TypeformEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onSubmitRef = useRef(onSubmit);
  const formId = extractTypeformId(TYPEFORM_URL);

  onSubmitRef.current = onSubmit;

  useEffect(() => {
    if (!formId || !containerRef.current) return;

    const container = containerRef.current;
    const callbackName = `asmaTypeformSubmit_${formId.replace(/[^a-zA-Z0-9]/g, "")}`;

    const handleSubmit = () => {
      onSubmitRef.current?.();
    };

    (window as unknown as Record<string, () => void>)[callbackName] = handleSubmit;

    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;
    let iframeObserver: MutationObserver | null = null;

    const startResizeObserver = () => {
      resizeObserver = new ResizeObserver(() => {
        syncTypeformHeight(container);
      });
      resizeObserver.observe(container);

      iframeObserver = new MutationObserver(() => {
        syncTypeformHeight(container);
      });
      iframeObserver.observe(container, { childList: true, subtree: true });
    };

    void loadTypeformEmbedScript()
      .then(() => {
        if (cancelled || !containerRef.current) return;

        container.innerHTML = "";

        const widget = document.createElement("div");
        widget.setAttribute("data-tf-widget", formId);
        widget.setAttribute("data-tf-opacity", "0");
        widget.setAttribute("data-tf-hide-headers", "");
        widget.setAttribute("data-tf-hide-footer", "");
        widget.setAttribute("data-tf-on-submit", callbackName);
        widget.style.width = "100%";
        widget.style.height = "100%";
        container.appendChild(widget);

        window.tf?.load();
        startResizeObserver();
        syncTypeformHeight(container);

        window.setTimeout(() => syncTypeformHeight(container), 250);
        window.setTimeout(() => syncTypeformHeight(container), 1000);
      })
      .catch(() => {
        // Embed script failed — form area stays empty.
      });

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      iframeObserver?.disconnect();
      container.innerHTML = "";
      delete (window as unknown as Record<string, unknown>)[callbackName];
    };
  }, [formId]);

  if (!formId) return null;

  return (
    <div ref={containerRef} className={`typeform-embed ${className ?? ""}`} />
  );
}
