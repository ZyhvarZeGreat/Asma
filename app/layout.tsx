import type { Metadata } from "next";
import localFont from "next/font/local";
import { CustomCursor } from "@/components/CustomCursor";
import "./globals.css";

const creatoDisplay = localFont({
  src: [
    {
      path: "../public/images/fonts/CreatoDisplay-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/images/fonts/CreatoDisplay-ThinItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/images/fonts/CreatoDisplay-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/images/fonts/CreatoDisplay-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/images/fonts/CreatoDisplay-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/images/fonts/CreatoDisplay-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/images/fonts/CreatoDisplay-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/images/fonts/CreatoDisplay-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/images/fonts/CreatoDisplay-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/images/fonts/CreatoDisplay-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/images/fonts/CreatoDisplay-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/images/fonts/CreatoDisplay-ExtraBoldItalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../public/images/fonts/CreatoDisplay-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/images/fonts/CreatoDisplay-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-creato-display",
  display: "swap",
});

const creatoRegular = localFont({
  src: "../public/images/fonts/CreatoDisplay-Regular.otf",
  weight: "400",
  style: "normal",
  variable: "--font-creato-regular",
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
      className={`${creatoDisplay.variable} ${creatoRegular.variable}`}
    >
      <body className={`${creatoDisplay.className} font-sans antialiased`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
