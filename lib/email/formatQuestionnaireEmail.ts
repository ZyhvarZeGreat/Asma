import {
  questionnaireSteps,
  type QuestionnaireAnswers,
} from "@/lib/questionnaire";

export function formatQuestionnaireEmail(answers: QuestionnaireAnswers): {
  subject: string;
  text: string;
  html: string;
} {
  const subject = `New ASMA Application — ${answers.fullName} (${answers.companyName})`;

  const lines = questionnaireSteps.map((step) => ({
    label: step.question,
    value: answers[step.id] ?? "",
  }));

  const text = [
    "New Growth Partnership Application",
    "—".repeat(40),
    ...lines.map(({ label, value }) => `${label}\n${value}`),
    "",
    "Submitted via asmacreativo.com",
  ].join("\n\n");

  const html = `
    <h2>New Growth Partnership Application</h2>
    ${lines
      .map(
        ({ label, value }) =>
          `<p><strong>${escapeHtml(label)}</strong><br/>${escapeHtml(value).replace(/\n/g, "<br/>")}</p>`,
      )
      .join("")}
    <p style="color:#888;font-size:12px;">Submitted via asmacreativo.com</p>
  `.trim();

  return { subject, text, html };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
