import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AppProvider } from "@/providers/app-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Trip Minder",
  description: "AI assistant for planning your next trip.",
  // Basic metadata
  keywords: ["travel", "AI assistant", "trip planning", "vacation"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name/Company",
  publisher: "Your Company",

  // Open Graph metadata for social sharing
  openGraph: {
    title: "Trip Minder",
    description: "AI assistant for planning your next trip.",
    url: "https://your-domain.com",
    siteName: "Trip Minder",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Trip Minder - AI Travel Assistant",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    title: "Trip Minder",
    description: "AI assistant for planning your next trip.",
    creator: "@yourhandle",
    images: ["https://your-domain.com/twitter-image.jpg"],
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },

  // Viewport
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },

  // Verification for search engines
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Manifest
  manifest: "/manifest.json",

  // Alternative languages
  alternates: {
    canonical: "https://your-domain.com",
    languages: {
      "en-US": "https://your-domain.com/en-US",
      "es-ES": "https://your-domain.com/es",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#ffe4e6] to-[#dbeafe]">
            <Header />
            {children}
            <Footer />
          </div>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
