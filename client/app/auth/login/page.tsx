"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import useLoginMutation from "@/hooks/user/useLoginMutation";
import { toast } from "@/hooks/useToast";

const LoginPage = () => {
  const loginFormSchema = z.object({
    email: z
      .string()
      .email({ message: "Please enter a valid e-mail." })
      .nonempty({ message: "E-Mail cannot be blank." }),
    password: z.string().nonempty({ message: "Password cannot be blank." }),
  });

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });
  const login = useLoginMutation();

  const onLoginFormSubmit = async (loginFormData: z.infer<typeof loginFormSchema>) => {
    const loginResponse = await login.mutateAsync({
      email: loginFormData.email,
      password: loginFormData.password,
    });
    if (loginResponse && loginResponse.isSuccess) {
      return redirect("/");
    } else {
      return toast({
        title: "Error",
        description: loginResponse.message,
      });
    }
  };

  return (
    <main className="w-[100vw] h-[100vh] flex items-center justify-center bg-[url('/images/auth_background.jpg')] bg-cover bg-center">
      <Card className="w-[350px]">
        <CardHeader className="items-center justify-center">
          <CardTitle className="pt-3">Welcome Back</CardTitle>
          <CardDescription>Login to Continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form noValidate onSubmit={form.handleSubmit(onLoginFormSubmit)} className="flex flex-col gap-2">
            <Controller
              name="email"
              control={form.control}
              render={({ field }) => {
                return (
                  <div>
                    <Label htmlFor="email-input">E-Mail</Label>
                    <Input
                      {...field}
                      id="email-input"
                      type="text"
                      className={`${form.formState.errors.email ? "border-red-800" : ""}`}
                    />
                    {form.formState.errors.email?.message && (
                      <span className="text-sm text-red-800">{form.formState.errors.email?.message}</span>
                    )}
                  </div>
                );
              }}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field }) => {
                return (
                  <div>
                    <Label htmlFor="password-input">Password</Label>
                    <Input
                      {...field}
                      id="password-input"
                      type="password"
                      className={`${form.formState.errors.password ? "border-red-800" : ""}`}
                    />
                    {form.formState.errors.password?.message && (
                      <span className=" text-sm text-red-800">{form.formState.errors.password?.message}</span>
                    )}
                  </div>
                );
              }}
            />
            <Button type="submit">
              {login.isPending ? (
                <></>
              ) : (
                <>
                  <LogIn /> Login
                </>
              )}
            </Button>
          </form>
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
