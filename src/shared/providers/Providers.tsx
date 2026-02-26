"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/lib/react-query/queryClient";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}