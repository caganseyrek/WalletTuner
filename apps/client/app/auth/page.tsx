"use client";

import { useEffect } from "react";

import { redirect } from "next/navigation";

const AuthRootPage = () => {
  useEffect(() => redirect("/auth/login"));

  return null;
};

export default AuthRootPage;
