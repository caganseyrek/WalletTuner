import React from "react";

import { Loader } from "lucide-react";

import BaseOverlay from "./BaseOverlay";

const LoadingOverlay = () => {
  return (
    <BaseOverlay>
      <div className="flex flex-col items-center justify-center gap-2">
        <Loader className="w-6 h-6 min-h-6 min-w-6 animate-spin" />
        <span className="font-semibold tracking-tight">Loading the data...</span>
      </div>
    </BaseOverlay>
  );
};

export default LoadingOverlay;
