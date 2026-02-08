import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const metaTitle = "master solutions | software, automations, crm";
const metaDescription =
  "Software, automations, and CRM implementations that remove manual work. Engineering-grade delivery in weeks, not months.";

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  metadataBase: new URL("https://mastersolutions.dev"),
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    url: "https://mastersolutions.dev",
    siteName: "master solutions",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "master solutions preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: metaTitle,
    description: metaDescription,
    images: ["/og-image.svg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${jakarta.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
