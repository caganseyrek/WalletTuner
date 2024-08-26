import { ReactNode } from "react";

interface ButtonProps {
  id?: string;
  className?: string;
  type?: "button" | "reset" | "submit";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  value?: string;
  onClick?: (() => unknown) | (() => void);
}

const Button = ({ id, className, type, leftIcon, rightIcon, value, onClick }: ButtonProps) => {
  return (
    <button id={id} className={className} type={type} onClick={onClick}>
      {leftIcon}
      {value}
      {rightIcon}
    </button>
  );
};

export default Button;
