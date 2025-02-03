"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { z } from "zod";

import useAccountCreateMutation from "@/hooks/account/useAccountCreateMutation";

import { Button } from "../../../../packages/interface/src/components/base/button";
import { Input } from "../../../../packages/interface/src/components/base/input";
import { Label } from "../../../../packages/interface/src/components/base/label";

const CreateAccountForm = () => {
  const createAccountSchema = z.object({
    accountName: z.string().nonempty({ message: "Account name cannot be empty." }),
  });

  const form = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: { accountName: "" },
  });

  const createAccount = useAccountCreateMutation();

  const onCreateAccount = async (createAccountFormData: z.infer<typeof createAccountSchema>) =>
    createAccount.mutateAsync({ accountName: createAccountFormData.accountName });

  return (
    <form noValidate onSubmit={form.handleSubmit(onCreateAccount)} className="py-8 flex flex-col gap-4">
      <Controller
        name="accountName"
        control={form.control}
        render={({ field }) => {
          return (
            <div>
              <Label htmlFor="accountname-input">Account Name</Label>
              <Input
                {...field}
                id="accountname-input"
                type="text"
                className={`${form.formState.errors.accountName ? "border-red-800" : ""}`}
              />
              {form.formState.errors.accountName?.message && (
                <span className="text-sm text-red-800">{form.formState.errors.accountName?.message}</span>
              )}
            </div>
          );
        }}
      />
      <Button type="submit" className="text-sm">
        <Plus /> Create New Account
      </Button>
    </form>
  );
};

export default CreateAccountForm;
