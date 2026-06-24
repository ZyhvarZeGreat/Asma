const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() ?? "";
const typeformUrl = process.env.NEXT_PUBLIC_TYPEFORM_URL?.trim() ?? "";
const jotformUrl = process.env.NEXT_PUBLIC_JOTFORM_URL?.trim() ?? "";

export const CALENDLY_URL = calendlyUrl;
export const TYPEFORM_URL = typeformUrl;
export const JOTFORM_URL = jotformUrl;

export const INTAKE_FORM_URL = typeformUrl || jotformUrl;

/** @deprecated Use TYPEFORM_URL or JOTFORM_URL */
export const QUESTIONNAIRE_URL = INTAKE_FORM_URL;

export function extractTypeformId(url: string): string {
  const match = url.match(/\/to\/([^/?]+)/);
  return match?.[1] ?? "";
}

export function getTypeformEmbedUrl(url: string): string {
  if (!url) return "";

  const normalized = url.startsWith("http") ? url : `https://${url}`;
  const parsed = new URL(normalized);

  parsed.searchParams.set("typeform-embed", "embed-widget");
  parsed.searchParams.set("embed-opacity", "0");
  parsed.searchParams.set("typeform-welcome", "0");

  return parsed.toString();
}

export function getJotformEmbedUrl(url: string): string {
  if (!url) return "";

  const normalized = url.startsWith("http") ? url : `https://${url}`;
  const parsed = new URL(normalized);

  parsed.searchParams.set("embed", "1");
  parsed.searchParams.set("noRedirect", "1");

  return parsed.toString();
}
