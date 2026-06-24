import type { Metadata } from "next";
import localFont from "next/font/local";
import { CustomCursor } from "@/components/CustomCursor";
import "./globals.css";

const clashDisplay = localFont({
  src: [
    {
      path: "../public/images/fonts/ClashDisplay-Extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/images/fonts/ClashDisplay-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/images/fonts/ClashDisplay-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/images/fonts/ClashDisplay-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/images/fonts/ClashDisplay-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/images/fonts/ClashDisplay-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

const clashGrotesk = localFont({
  src: [
    {
      path: "../public/images/fonts/ClashGrotesk-Extralight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/images/fonts/ClashGrotesk-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/images/fonts/ClashGrotesk-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/images/fonts/ClashGrotesk-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/images/fonts/ClashGrotesk-Semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/images/fonts/ClashGrotesk-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ASMA Creativo | Building Global Brands From Africa",
  description:
    "A global brand & marketing agency building memorable brands from Africa for the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${clashGrotesk.variable}`}
    >
      <body className={`${clashDisplay.className} font-sans antialiased`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
