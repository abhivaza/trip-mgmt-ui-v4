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

  return (
    <header className="py-4 px-4 md:px-8 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-3xl md:text-4xl font-bold">
            <CompanyLogo />
          </Link>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-4">
              <Link
                href="#features"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Features
              </Link>
              <Link
                href="#explore"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Explore trips
              </Link>
            </nav>
            {user ? (
              <>
                <Link
                  href="/app/trips"
                  className="hidden md:flex text-sm font-medium hover:text-primary transition-colors"
                >
                  My Trips
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex items-center"
                  onClick={signOut}
                >
                  <LogIn className="mr-2 h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex items-center"
                onClick={openLoginDialog}
              >
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
            )}
            <MobileMenu
              user={user}
              signOut={signOut}
              openLoginDialog={openLoginDialog}
            />
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
