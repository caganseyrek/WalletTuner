import React from "react";

import { Toaster } from "@/components/base/toaster";
import Providers from "@/components/Providers";

import "@/shared/styles/globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html suppressHydrationWarning>
      <head></head>
      <body className="p-0 m-0">
        <Providers>
          <main className="w-full">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
