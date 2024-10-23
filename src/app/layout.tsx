import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AppProvider } from "@/providers/app-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Travel Minder",
  description: "AI assistant for planning your next trip.",
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
