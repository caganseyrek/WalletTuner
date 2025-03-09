import React from "react";

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div className="w-full h-full flex flex-col items-center justify-center bg-accent">{children}</div>;
};

export default AuthLayout;
