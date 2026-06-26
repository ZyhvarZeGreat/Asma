export const assets = {
  hero: "/images/hero-slide-1.png",
  heroSlides: [
    "/images/hero-slide-1.png",
    "/images/hero-slide-2.png",
    "/images/hero-slide-3.png",
    "/images/hero-slide-4.png",
  ],
  logo: "/images/logo.png",
} as const;

export const site = {
  headerTagline: ["Building global", "brands from Africa."] as const,
  location: "Nigeria, Africa.",
  launchNotice: "Full Website Launching Soon",
  brandName: "ASMA Creativo",
  tagline: ["Building Global Brands", "From Africa."] as const,
  description: [
    "A global branding & marketing agency building memorable brands",
    "from Africa for the world.",
  ],
  agencyLabel: ["Global Brand &", "Marketing Agency"] as const,
} as const;

export const services = {
  branding: {
    label: "Branding",
    columns: [
      ["Brand Identity", "Brand Strategy", "Brand Positioning"],
      ["Brand Consulting", "Strategic Storytelling"],
    ],
  },
  marketing: {
    label: "Marketing",
    columns: [
      [
        "Growth Marketing",
        "Go-to-Market Strategy",
        "Content Marketing",
        "Launch Campaigns",
        "Website Development",
      ],
      [
        "SEO",
        "Marketing Analytics",
        "Marketing Consulting",
        "Social Media Management",
      ],
    ],
  },
} as const;

export type ServiceTab = keyof typeof services;

export const ourStory = {
  title: "Our Story",
  tagline: "Building Global Brands From Africa.",
  paragraphs: [
    "ASMA is a Pan-African branding and marketing agency dedicated to building globally recognized brands from Africa while helping global brands successfully enter and thrive within African markets.",
    "We provide brand strategy, market positioning, growth marketing, and go-to-market solutions that help businesses scale across borders, connect with consumers, and create lasting market impact.",
    "ASMA serves ambitious African founders, startups, SMEs, and established companies seeking global relevance, as well as international brands looking to enter, understand, and grow within Africa's diverse markets.",
    "Our mission is to bridge Africa and the world by building brands that transcend and tell stories across borders. We are committed to helping African brands compete on the global stage while enabling global brands to authentically connect with African consumers, creating sustainable growth and economic impact across the continent.",
  ],
} as const;
