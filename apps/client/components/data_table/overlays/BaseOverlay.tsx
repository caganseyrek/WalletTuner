import React from "react";

import GlobalTypes from "@/types/globals";

const BaseOverlay = ({ children }: GlobalTypes.BaseWrapperProps) => {
  return <div className="w-full h-full flex-1 flex items-center justify-center">{children}</div>;
};

export default BaseOverlay;
