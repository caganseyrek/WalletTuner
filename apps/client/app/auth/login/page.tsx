"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";

import Link from "next/link";
import { redirect } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn } from "lucide-react";
import { z } from "zod";

import useLoginMutation from "@/hooks/auth/useLoginMutation";
import { useToast } from "@/hooks/interface/useToast";

import { Button } from "@/components/base/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/base/card";
import { Input } from "@/components/base/input";
import { Label } from "@/components/base/label";
import Icon from "@/components/Icon";

const loginFormSchema = z.object({
  email: z.string().nonempty({ message: "Email field is required" }).email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .nonempty({ message: "Password field is required" })
    .min(8, { message: "Password should be 8-35 characters long." })
    .max(35, { message: "Password should be 8-35 characters long." }),
});

type LoginFromSchemProps = z.infer<typeof loginFormSchema>;

const LoginPage = () => {
  const loginMutation = useLoginMutation();

  const { toast } = useToast();
  const form = useForm<LoginFromSchemProps>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onLoginFormSubmit = async (formData: LoginFromSchemProps) => {
    const response = await loginMutation.mutateAsync({
      email: formData.email,
      password: formData.password,
    });
    if (response && response.isSuccess) {
      return redirect("/app");
    } else {
      return toast({
        title: "An error ocurred",
        description: "Please try logging in again.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Icon size="large" />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Welcome Back!</CardTitle>
          <CardDescription className="text-center">Login to your WalletTuner account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            noValidate
            className="flex flex-col items-start justify-start gap-4"
            onSubmit={form.handleSubmit(onLoginFormSubmit)}>
            <Controller
              control={form.control}
              name="email"
              render={({ field }) => (
                <div className="w-full flex flex-col items-start justify-start gap-2">
                  <Label htmlFor="email">E-Mail</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="someone@example.com"
                    className={form.formState.errors.email ? "border-destructive" : ""}
                    {...field}
                  />
                  {form.formState.errors.email && (
                    <span className="text-xs text-destructive">{form.formState.errors.email.message}</span>
                  )}
                </div>
              )}
            />
            <Controller
              control={form.control}
              name="password"
              render={({ field }) => (
                <div className="w-full flex flex-col items-start justify-start gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    className={form.formState.errors.password ? "border-destructive" : ""}
                    {...field}
                  />
                  {form.formState.errors.password && (
                    <span className="text-xs text-destructive">{form.formState.errors.password.message}</span>
                  )}
                </div>
              )}
            />
            <Button className="w-full" type="submit" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <LogIn /> Login
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center flex items-center justify-center text-sm">
          <Link href="/auth/register" className="hover:underline">
            Don't have an account? Sign up
          </Link>
        </CardFooter>
      </Card>
      <span className="text-xs text-muted-foreground w-[250px] text-center">
        By logging in, you agree to our
        <br />
        <Link href={""} className="hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href={""} className="hover:underline">
          Privacy Policy
        </Link>
      </span>
    </div>
  );
};

export default LoginPage;
