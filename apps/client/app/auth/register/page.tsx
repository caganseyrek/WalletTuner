"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";

import Link from "next/link";
import { redirect } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn } from "lucide-react";
import { z } from "zod";

import useRegisterMutation from "@/hooks/auth/useRegisterMutation";
import { useToast } from "@/hooks/interface/useToast";

import { Button } from "@/components/base/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/base/card";
import { Input } from "@/components/base/input";
import { Label } from "@/components/base/label";
import Icon from "@/components/Icon";

const registerFormSchema = z.object({
  full_name: z.string().nonempty({ message: "Name field is required" }),
  email: z.string().nonempty({ message: "Email field is required" }).email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .nonempty({ message: "Password field is required" })
    .min(8, { message: "Password should be 8-35 characters long." })
    .max(35, { message: "Password should be 8-35 characters long." }),
});

type RegisterFromSchemProps = z.infer<typeof registerFormSchema>;

const RegisterPage = () => {
  const registerMutation = useRegisterMutation();

  const { toast } = useToast();
  const form = useForm<RegisterFromSchemProps>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { full_name: "", email: "", password: "" },
  });

  const onRegisterFormSubmit = async (formData: RegisterFromSchemProps) => {
    const response = await registerMutation.mutateAsync({
      full_name: formData.full_name,
      email: formData.email,
      password: formData.password,
    });
    if (response && response.isSuccess) {
      return redirect("/login");
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
          <CardTitle className="text-center text-2xl">Welcome!</CardTitle>
          <CardDescription className="text-center">Create a WalletTuner account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            noValidate
            className="flex flex-col items-start justify-start gap-4"
            onSubmit={form.handleSubmit(onRegisterFormSubmit)}>
            <Controller
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <div className="w-full flex flex-col items-start justify-start gap-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    type="text"
                    placeholder="Someone"
                    className={form.formState.errors.full_name ? "border-destructive" : ""}
                    {...field}
                  />
                  {form.formState.errors.full_name && (
                    <span className="text-xs text-destructive">{form.formState.errors.full_name.message}</span>
                  )}
                </div>
              )}
            />
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
            <Button className="w-full" type="submit" disabled={registerMutation.isPending}>
              {registerMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <LogIn /> Register
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center flex items-center justify-center text-sm">
          <Link href="/auth/login" className="hover:underline">
            Already have an account? Sign in
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

export default RegisterPage;
