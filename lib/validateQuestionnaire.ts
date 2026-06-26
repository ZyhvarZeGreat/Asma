import {
  questionnaireSteps,
  type QuestionnaireAnswers,
  type QuestionnaireField,
} from "@/lib/questionnaire";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const NAME_REGEX = /^[\p{L}\s'.-]{2,100}$/u;
const URL_REGEX =
  /^(https?:\/\/)?(www\.)?[\w-]+(\.[\w-]{2,})+([\w#%&()+./:=?@~-]*)?$/i;
const SOCIAL_HANDLE_REGEX = /^@?[\w.]{2,30}$/;

function validateName(value: string, label: string): string | null {
  const trimmed = value.trim();

  if (trimmed.length < 2) {
    return `${label} must be at least 2 characters.`;
  }

  if (!NAME_REGEX.test(trimmed)) {
    return `${label} can only include letters, spaces, hyphens, and apostrophes.`;
  }

  return null;
}

function validateEmail(value: string): string | null {
  const trimmed = value.trim();

  if (!trimmed) {
    return "Email address is required.";
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return "Enter a valid email address (e.g. you@company.com).";
  }

  return null;
}

function validateWebsiteOrSocial(value: string): string | null {
  const trimmed = value.trim();

  if (trimmed.length < 3) {
    return "Enter a valid website URL or social handle.";
  }

  if (URL_REGEX.test(trimmed) || SOCIAL_HANDLE_REGEX.test(trimmed)) {
    return null;
  }

  return "Enter a valid website URL (e.g. https://yourbrand.com) or handle (e.g. @brand).";
}

function validateTextField(
  value: string,
  label: string,
  minLength = 15,
): string | null {
  const trimmed = value.trim();

  if (trimmed.length < minLength) {
    return `${label} must be at least ${minLength} characters.`;
  }

  if (trimmed.length > 2000) {
    return `${label} must be under 2000 characters.`;
  }

  return null;
}

function validateCompanyName(value: string): string | null {
  const trimmed = value.trim();

  if (trimmed.length < 2) {
    return "Company name must be at least 2 characters.";
  }

  if (trimmed.length > 150) {
    return "Company name must be under 150 characters.";
  }

  return null;
}

function validateBudget(value: string): string | null {
  const budgetStep = questionnaireSteps.find((step) => step.id === "budget");

  if (!budgetStep || budgetStep.type !== "choice") {
    return "Please select a budget range.";
  }

  const isValid = (budgetStep.options as readonly string[]).includes(value);
  if (!isValid) {
    return "Please select a budget range.";
  }

  return null;
}

export function validateQuestionnaireField(
  field: QuestionnaireField,
  value: string,
): string | null {
  switch (field) {
    case "fullName":
      return validateName(value, "Full name");
    case "companyName":
      return validateCompanyName(value);
    case "email":
      return validateEmail(value);
    case "websiteOrSocial":
      return validateWebsiteOrSocial(value);
    case "brandInspiration":
      return validateTextField(value, "This answer");
    case "misalignedMarketing":
      return validateTextField(value, "This answer");
    case "competitiveEdge":
      return validateTextField(value, "This answer");
    case "primaryGoal":
      return validateTextField(value, "This answer");
    case "budget":
      return validateBudget(value);
    default: {
      const exhaustiveCheck: never = field;
      return exhaustiveCheck;
    }
  }
}

export function validateQuestionnaireAnswers(
  answers: QuestionnaireAnswers,
): string | null {
  for (const step of questionnaireSteps) {
    const error = validateQuestionnaireField(
      step.id,
      answers[step.id as QuestionnaireField],
    );

    if (error) {
      return error;
    }
  }

  return null;
}
