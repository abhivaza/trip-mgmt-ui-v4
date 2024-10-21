"use client";

import React, { ReactNode } from "react";
import { ApiProvider } from "@/providers/api-provider";
import { AuthProvider } from "@/providers/auth-provider";
// Import other providers as needed

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <ApiProvider>{children}</ApiProvider>
    </AuthProvider>
  );
}
