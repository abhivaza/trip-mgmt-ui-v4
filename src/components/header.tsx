"use client";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";
import CompanyLogo from "@/components/company-logo";
import { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { auth } from "@/firebase";
import LoginPopup from "./login-popup";
import MobileMenu from "@/components/mobile-menu";

export default function Header() {
  const { user } = useAuth();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const openLoginDialog = () => {
    setIsLoginDialogOpen(true);
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  const userName = user?.displayName || user?.email?.split("@")[0] || "there";

  return (
    <header className="py-4 px-4 md:px-8 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-3xl md:text-4xl font-bold">
            <CompanyLogo />
          </Link>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-4"></nav>
            {user ? (
              <>
                <Link
                  href="/app/trips"
                  className="hidden md:flex text-sm font-medium hover:text-primary transition-colors"
                >
                  My Trips
                </Link>
                <span className="hidden md:flex text-sm font-medium text-muted-foreground mr-2">
                  Hi, {userName}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex items-center"
                  onClick={signOut}
                >
                  <LogIn className="mr-2 h-4 w-4" /> Logout
                </Button>
                <MobileMenu
                  signOut={signOut}
                  openLoginDialog={openLoginDialog}
                />
              </>
            ) : (
              <>
                <Link
                  href="#features"
                  className="hidden md:flex text-sm font-medium hover:text-primary transition-colors"
                >
                  Features
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="items-center"
                  onClick={openLoginDialog}
                >
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <LoginPopup
        isOpen={isLoginDialogOpen}
        onClose={() => setIsLoginDialogOpen(false)}
      />
    </header>
  );
}
