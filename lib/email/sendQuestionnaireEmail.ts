import nodemailer from "nodemailer";
import type { QuestionnaireAnswers } from "@/lib/questionnaire";
import { formatQuestionnaireEmail } from "./formatQuestionnaireEmail";

function getSmtpConfig() {
  const host = process.env.ZOHO_SMTP_HOST?.trim();
  const port = Number(process.env.ZOHO_SMTP_PORT ?? "465");
  const user = process.env.ZOHO_SMTP_USER?.trim();
  const pass = process.env.ZOHO_SMTP_PASS?.trim();
  const notifyTo =
    process.env.QUESTIONNAIRE_NOTIFY_TO?.trim() ?? "admin@asmacreativo.com";

  if (!host || !user || !pass) {
    throw new Error("Email is not configured on the server.");
  }

  return { host, port, user, pass, notifyTo };
}

export async function sendQuestionnaireEmail(
  answers: QuestionnaireAnswers,
): Promise<void> {
  const { host, port, user, pass, notifyTo } = getSmtpConfig();
  const { subject, text, html } = formatQuestionnaireEmail(answers);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"ASMA Creativo Website" <${user}>`,
    to: notifyTo,
    replyTo: answers.email,
    subject,
    text,
    html,
  });
}
