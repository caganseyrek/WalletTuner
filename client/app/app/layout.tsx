import React from "react";

import LayoutSidebar from "@/components/LayoutSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <LayoutSidebar />
      {children}
    </>
  );
};

export default RootLayout;
