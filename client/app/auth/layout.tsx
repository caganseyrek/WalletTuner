"use client";

import React, { ReactNode } from "react";

import { redirect } from "next/navigation";

import useValidateAuth from "@/hooks/useValidateAuth";

interface AuthRootLayoutProps {
  children: ReactNode;
}

const AuthRootLayout = ({ children }: AuthRootLayoutProps) => {
  const { data: validateAuthRepsonse } = useValidateAuth();

  if (validateAuthRepsonse && validateAuthRepsonse.isSuccess) {
    return redirect("/app");
  }

  return <>{children}</>;
};

export default AuthRootLayout;
