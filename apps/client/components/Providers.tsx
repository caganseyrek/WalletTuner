"use client";

import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { SidebarProvider } from "./base/sidebar";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: 3, retryDelay: 2000 },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider attribute="class" enableSystem defaultTheme="system" disableTransitionOnChange>
        <SidebarProvider>{children}</SidebarProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </NextThemesProvider>
    </QueryClientProvider>
  );
};

export default Providers;
