"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";

import { redirect } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { z } from "zod";

import { toast } from "@/hooks/interface/useToast";
import useRegisterMutation from "@/hooks/user/useRegisterMutation";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const RegisterPageForm = () => {
  const registerFormSchema = z.object({
    fullName: z.string().nonempty({ message: "Full name cannot be blank." }),
    email: z
      .string()
      .email({ message: "Please enter a valid e-mail." })
      .nonempty({ message: "E-Mail cannot be blank." }),
    password: z.string().nonempty({ message: "Password cannot be blank." }),
    passwordAgain: z.string().nonempty({ message: "Password cannot be blank." }),
  });

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { fullName: "", email: "", password: "", passwordAgain: "" },
  });

  const register = useRegisterMutation();

  const onRegisterFormSubmit = async (registerFormData: z.infer<typeof registerFormSchema>) => {
    if (registerFormData.password !== registerFormData.passwordAgain) {
      form.setError("passwordAgain", { message: "Passwords do not match." });
      return toast({
        title: "Error",
        description: form.formState.errors.passwordAgain?.message,
      });
    }
    const registerResponse = await register.mutateAsync({
      fullName: registerFormData.fullName,
      email: registerFormData.email,
      password: registerFormData.password,
    });
    if (registerResponse && registerResponse.isSuccess) {
      return redirect("/");
    } else {
      return toast({
        title: "Error",
        description: registerResponse.message,
      });
    }
  };

  return (
    <form noValidate onSubmit={form.handleSubmit(onRegisterFormSubmit)} className="flex flex-col gap-2">
      <Controller
        name="fullName"
        control={form.control}
        render={({ field }) => {
          return (
            <div>
              <Label htmlFor="fullname-input">Full Name</Label>
              <Input
                {...field}
                id="fullname-input"
                type="text"
                className={`${form.formState.errors.email ? "border-red-800" : ""}`}
              />
              {form.formState.errors.fullName?.message && (
                <span className="text-sm text-red-800">{form.formState.errors.fullName?.message}</span>
              )}
            </div>
          );
        }}
      />
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
      <Controller
        name="passwordAgain"
        control={form.control}
        render={({ field }) => {
          return (
            <div>
              <Label htmlFor="passwordagain-input">Password Again</Label>
              <Input
                {...field}
                id="passwordagain-input"
                type="password"
                className={`${form.formState.errors.passwordAgain ? "border-red-800" : ""}`}
              />
              {form.formState.errors.passwordAgain?.message && (
                <span className=" text-sm text-red-800">{form.formState.errors.passwordAgain?.message}</span>
              )}
            </div>
          );
        }}
      />
      <Button type="submit" className="text-sm">
        {register.isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <Send /> Register
          </>
        )}
      </Button>
    </form>
  );
};

export default RegisterPageForm;
