import React from "react";

import { ChevronRight } from "lucide-react";

interface BreadCrumbsProps {
  crumbs: { key: string; label: string }[];
}

const BreadCrumbs = ({ crumbs }: BreadCrumbsProps) => {
  return (
    <div className="flex flex-row items-center justify-start gap-3">
      {crumbs.map((crumb, index) => (
        <span key={crumb.key} className="flex flex-row items-center justify-start gap-3">
          {index !== 0 && <ChevronRight className="w-[18px] h-[18px]" />}
          {crumb.label}
        </span>
      ))}
    </div>
  );
};

export default BreadCrumbs;
