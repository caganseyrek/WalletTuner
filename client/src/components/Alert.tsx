import { ReactNode } from "react";

import { CheckCircle, CircleAlert, Info, TriangleAlert } from "lucide-react";

interface AlertComponentProps {
  type: "success" | "info" | "warning" | "error";
  customIcon?: ReactNode;
  text: string;
}

const Alert = ({ type, customIcon, text }: AlertComponentProps) => {
  let AlertIcon: ReactNode;
  if (type === "success") {
    AlertIcon = <CheckCircle size={18} />;
  } else if (type === "info") {
    AlertIcon = <Info size={18} />;
  } else if (type === "warning") {
    AlertIcon = <TriangleAlert size={18} />;
  } else if (type === "error") {
    AlertIcon = <CircleAlert size={18} />;
  }

  return (
    <div className={`alert ${type}`}>
      {customIcon && AlertIcon}
      {text}
    </div>
  );
};

export default Alert;
