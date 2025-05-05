"use client";
import { useRouter } from "next/navigation";
import type React from "react";

import { useAuth } from "@/providers/auth-provider";
import { useEffect } from "react";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
