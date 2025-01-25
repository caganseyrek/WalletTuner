"use client";

import { useEffect } from "react";

import ComponentTypes from "@/types/components";
import { useRouter } from "next/navigation";

import useAuthDetails from "@/hooks/useAuthDetails";

const AuthCheckProvider = ({ children }: ComponentTypes.AuthCheckProps) => {
  const navigate = useRouter();
  const { data: authDetails } = useAuthDetails();

  useEffect(() => {
    if (!authDetails || !authDetails.accessToken) {
      return navigate.replace("/login");
    }
    return navigate.replace("/accounts");
  }, [authDetails, navigate]);

  return <>{children}</>;
};

export default AuthCheckProvider;
