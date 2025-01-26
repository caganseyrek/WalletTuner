import React from "react";

import { ArrowLeft } from "lucide-react";

const AppRootPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-semibold tracking-tight flex flex-row items-center justify-start gap-4">
        Welcome to WalletTuner
      </h1>
      <span className="text-muted-foreground flex flex-row gap-2 items-center justify-center">
        <ArrowLeft className="w-[20px] h-[20px]" />
        You can select a page from the sidebar to start!
      </span>
    </div>
  );
};

export default AppRootPage;
