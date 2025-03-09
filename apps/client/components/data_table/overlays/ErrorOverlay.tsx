import React from "react";

import { CloudAlert } from "lucide-react";

import BaseOverlay from "./BaseOverlay";

const ErrorOverlay = () => {
  return (
    <BaseOverlay>
      <div className="flex flex-col items-center justify-center gap-2">
        <CloudAlert className="w-8 h-8 min-h-8 min-w-8" />
        <div className="flex flex-col items-center justify-center gap-0.5">
          <span className="font-semibold tracking-tight">An error ocurred</span>
          <span className="text-sm text-muted-foreground">You can try refreshing the page or logging in again.</span>
        </div>
      </div>
    </BaseOverlay>
  );
};

export default ErrorOverlay;
