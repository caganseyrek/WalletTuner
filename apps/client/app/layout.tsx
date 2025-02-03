"use client";

import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "@/styles/globals.css";

interface LayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: 5, retryDelay: 2000 },
    },
  });

  return (
    <html>
      <head>
        <link rel="icon" href="/images/favicon.png" sizes="any" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
