"use client";
import { useRouter } from "next/navigation";
import type React from "react";

import { useAuth } from "@/providers/auth-provider";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/loading-spinner";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // wait for 2 seconds before redirecting
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [user]);

  if (isLoading && !user) {
    return (
      <div className="text-center mt-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isLoading && !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center  bg-gradient-to-br from-[#ffe4e6] to-[#dbeafe]">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Access Denied</h1>
            <p className="mt-2 text-gray-600">
              You need to be logged in to access this page.
            </p>
          </div>
          <div className="flex justify-center">
            <Button onClick={() => router.push("/")} className="px-6 py-2">
              Go to Home Page
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
