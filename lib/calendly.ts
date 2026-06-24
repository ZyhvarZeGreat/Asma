declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

let calendlyLoadPromise: Promise<void> | null = null;

function loadStylesheet(href: string): void {
  if (document.querySelector(`link[href="${href}"]`)) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

export function loadCalendlyScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.Calendly) {
    return Promise.resolve();
  }

  if (calendlyLoadPromise) {
    return calendlyLoadPromise;
  }

  loadStylesheet("https://assets.calendly.com/assets/external/widget.css");

  calendlyLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]',
    );

    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load Calendly")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Calendly"));
    document.head.appendChild(script);
  });

  return calendlyLoadPromise;
}

export async function openCalendlyPopup(url: string): Promise<void> {
  if (!url) return;

  await loadCalendlyScript();
  window.Calendly?.initPopupWidget({ url });
}
