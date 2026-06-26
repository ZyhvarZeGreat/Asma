import type { QuestionnaireAnswers } from "@/lib/questionnaire";

function postQuestionnaire(answers: QuestionnaireAnswers): Promise<Response> {
  return fetch("/api/questionnaire", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(answers),
    keepalive: true,
  });
}

/** Fire-and-forget — used when Calendly opens immediately after submit. */
export function submitQuestionnaireInBackground(
  answers: QuestionnaireAnswers,
): void {
  void postQuestionnaire(answers).catch(() => {
    // User has already moved on to booking; failure is logged server-side.
  });
}

export async function submitQuestionnaire(
  answers: QuestionnaireAnswers,
): Promise<void> {
  const response = await postQuestionnaire(answers);
  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data &&
      typeof data === "object" &&
      "error" in data &&
      typeof data.error === "string"
        ? data.error
        : "Failed to submit application.";
    throw new Error(message);
  }
}
