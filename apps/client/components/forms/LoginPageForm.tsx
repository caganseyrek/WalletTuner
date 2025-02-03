"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";

import { redirect } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn } from "lucide-react";
import { z } from "zod";

import { toast } from "@/hooks/interface/useToast";
import useLoginMutation from "@/hooks/user/useLoginMutation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPageComponent = () => {
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
      <Button type="submit" className="text-sm">
        <Button type="submit" className="text-sm">
          {login.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <LogIn /> Log In
            </>
          )}
        </Button>
      </Button>
    </form>
  );
};

export default LoginPageComponent;
