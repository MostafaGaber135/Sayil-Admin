"use client";

import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/lib/react-query/queryClient";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function detectRtlFromHtml(): boolean {
  if (typeof document === "undefined") return false;
  const dir = document.documentElement.getAttribute("dir");
  if (dir) return dir.toLowerCase() === "rtl";

  const lang = document.documentElement.getAttribute("lang");
  return (lang ?? "").toLowerCase().startsWith("ar");
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isRtl] = useState(() => detectRtlFromHtml());
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ToastContainer
          position={isRtl ? "top-left" : "top-right"}
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={isRtl}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </QueryClientProvider>
    </SessionProvider>
  );
}