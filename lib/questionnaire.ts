export const questionnaireIntro = {
  title: "ASMA Creativo Growth Partnership Application",
  paragraphs: [
    "Welcome to ASMA Creativo.",
    "We help African brands scale globally and help global brands enter African markets through strategic branding, marketing, and growth systems.",
    "Please complete this short application so we can determine if we're the right partner for your business.",
  ],
} as const;

export const questionnaireSteps = [
  {
    id: "fullName",
    question: "Full Name",
    placeholder: "Your full name",
    type: "text" as const,
  },
  {
    id: "companyName",
    question: "Company Name",
    placeholder: "Your company or brand",
    type: "text" as const,
  },
  {
    id: "email",
    question: "Email Address",
    placeholder: "you@company.com",
    type: "email" as const,
  },
  {
    id: "websiteOrSocial",
    question: "Website and/or Social Media Handle",
    placeholder: "https://yourbrand.com or @handle",
    type: "text" as const,
  },
  {
    id: "brandInspiration",
    question: "What inspired you to build this brand?",
    placeholder: "Tell us what drove you to start...",
    type: "textarea" as const,
  },
  {
    id: "misalignedMarketing",
    question:
      "What feels misaligned or ineffective in your current marketing or brand presence?",
    placeholder: "Share what's not working today...",
    type: "textarea" as const,
  },
  {
    id: "competitiveEdge",
    question: "What sets you apart from your competitors?",
    placeholder: "What makes your brand unique...",
    type: "textarea" as const,
  },
  {
    id: "primaryGoal",
    question: "What is your primary goal for the next 12 months?",
    placeholder: "Describe your main objective...",
    type: "textarea" as const,
  },
  {
    id: "budget",
    question: "What is your estimated budget for this project?",
    type: "choice" as const,
    options: [
      "$1,000 – $5,000",
      "$5,000 – $10,000",
      "$10,000 – $30,000",
      "$30,000 – $50,000",
      "$50,000 and above",
    ],
  },
] as const;

export type QuestionnaireField = (typeof questionnaireSteps)[number]["id"];

export type QuestionnaireAnswers = Record<QuestionnaireField, string>;

export const initialQuestionnaireAnswers: QuestionnaireAnswers = {
  fullName: "",
  companyName: "",
  email: "",
  websiteOrSocial: "",
  brandInspiration: "",
  misalignedMarketing: "",
  competitiveEdge: "",
  primaryGoal: "",
  budget: "",
};
