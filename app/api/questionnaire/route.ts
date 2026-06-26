import { NextResponse } from "next/server";
import { sendQuestionnaireEmail } from "@/lib/email/sendQuestionnaireEmail";
import {
  initialQuestionnaireAnswers,
  questionnaireSteps,
  type QuestionnaireAnswers,
  type QuestionnaireField,
} from "@/lib/questionnaire";
import { validateQuestionnaireAnswers } from "@/lib/validateQuestionnaire";

function isQuestionnaireAnswers(value: unknown): value is QuestionnaireAnswers {
  if (!value || typeof value !== "object") return false;

  const record = value as Record<string, unknown>;

  for (const step of questionnaireSteps) {
    const field = step.id as QuestionnaireField;
    if (typeof record[field] !== "string") return false;
  }

  return true;
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!isQuestionnaireAnswers(body)) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 },
      );
    }

    const answers: QuestionnaireAnswers = {
      ...initialQuestionnaireAnswers,
      ...body,
    };

    const validationError = validateQuestionnaireAnswers(answers);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    await sendQuestionnaireEmail(answers);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Questionnaire email failed:", error);
    return NextResponse.json(
      {
        error:
          "We could not send your application. Please try again or email admin@asmacreativo.com.",
      },
      { status: 500 },
    );
  }
}
