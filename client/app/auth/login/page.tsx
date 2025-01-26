import React from "react";

import { Metadata } from "next";
import Link from "next/link";

import LoginPageComponent from "@/components/forms/LoginPageForm";
import Icon from "@/components/Icon";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Login to Your Account - WalletTuner",
};

const LoginPage = () => {
  return (
    <main className="w-[100vw] h-[100vh] flex items-center justify-center bg-[url('/images/auth_background.jpg')] bg-cover bg-center">
      <Card className="w-[350px]">
        <CardHeader className="items-center justify-center">
          <Icon />
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Login to Continue</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginPageComponent />
        </CardContent>
        <CardFooter className="items-center justify-center">
          <Link href={"/auth/register"} className="text-muted-foreground text-sm">
            Don&apos;t have an account? Register now!
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
};

export default LoginPage;
