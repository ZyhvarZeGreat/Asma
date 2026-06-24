"use client";

import { getJotformEmbedUrl, JOTFORM_URL } from "@/lib/links";

type JotformEmbedProps = {
  className?: string;
};

export function JotformEmbed({ className }: JotformEmbedProps) {
  const embedUrl = getJotformEmbedUrl(JOTFORM_URL);

  if (!embedUrl) return null;

  return (
    <iframe
      title="ASMA Creativo Growth Partnership Application"
      src={embedUrl}
      className={className}
      allow="geolocation; microphone; camera; fullscreen"
      allowFullScreen
    />
  );
}
