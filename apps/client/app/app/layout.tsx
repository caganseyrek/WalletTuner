import React from "react";

import MainSidebar from "@/components/AppSidebar";

interface AppRootLayoutProps {
  children?: React.ReactNode;
}

const AppRootLayout = ({ children }: AppRootLayoutProps) => {
  return (
    <div className="w-full h-full flex flex-row items-start justify-start">
      <MainSidebar />
      <div className="w-full h-full">{children}</div>
    </div>
  );
};

export default AppRootLayout;
