import React from "react";

import Providers from "@/components/Providers";
import MainSidebar from "@/components/sidebar/MainSidebar";

import "@/shared/styles/globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html>
      <head></head>
      <body>
        <Providers>
          <MainSidebar />
          <main className="w-full">{children}</main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
