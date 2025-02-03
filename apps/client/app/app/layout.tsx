import React from "react";

import LayoutSidebar from "@/components/LayoutSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  // check for auth

  return (
    <SidebarProvider>
      <LayoutSidebar />
      <main className="w-[calc(100vw-256px)]">{children}</main>
    </SidebarProvider>
  );
};

export default RootLayout;
