import React from "react";

import Metadata from "next";
import Link from "next/link";

import RegisterPageForm from "@/components/forms/RegisterPageForm";
import Icon from "@/components/Icon";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Create a New Account - WalletTuner",
};

const RegisterPage = () => {
  return (
    <main className="w-[100vw] h-[100vh] flex items-center justify-center bg-[url('/images/auth_background.jpg')] bg-cover bg-center">
      <Card className="w-[350px]">
        <CardHeader className="items-center justify-center">
          <Icon />
          <CardTitle>Welcome!</CardTitle>
          <CardDescription>Register to Continue</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterPageForm />
        </CardContent>
        <CardFooter className="items-center justify-center">
          <Link href={"/auth/login"} className="text-muted-foreground text-sm">
            Already have an account? Login Now!
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
};

export default RegisterPage;
