"use client";

import React from "react";

import useAccountDeleteMutation from "@/hooks/account/useAccountDeleteMutation";
import useFormatter from "@/hooks/useFormatter";

import { Button } from "../../../../packages/interface/src/components/base/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../../packages/interface/src/components/base/sheet";
import { getAccountColumns } from "../columns/AccountColumns";
import TableComponent from "../data_display/TableComponent";
import CreateAccountForm from "../forms/CreateAccountForm";

const AccountPageComponent = () => {
  const formatter = useFormatter();
  const deleteAccount = useAccountDeleteMutation();

  return (
    <TableComponent
      columns={getAccountColumns({ formatterFn: formatter })}
      data={[
        {
          _id: "64b0ee2c189286a5abc6b4ba",
          accountName: "Cash",
          createdAt: "25.01.2025 at 22:44",
          balance: 400,
          totalIncome: 1000,
          totalExpense: 5000,
        },
        {
          _id: "64b0ee2c189286a5abc6b4ba",
          accountName: "Cash",
          createdAt: "25.01.2025 at 22:44",
          balance: 400,
          totalIncome: 1000,
          totalExpense: 5000,
        },
        {
          _id: "64b0ee2c189286a5abc6b4ba",
          accountName: "Cash",
          createdAt: "25.01.2025 at 22:44",
          balance: 400,
          totalIncome: 1000,
          totalExpense: 5000,
        },
        {
          _id: "64b0ee2c189286a5abc6b4ba",
          accountName: "Cash",
          createdAt: "25.01.2025 at 22:44",
          balance: 400,
          totalIncome: 1000,
          totalExpense: 5000,
        },
        {
          _id: "64b0ee2c189286a5abc6b4ba",
          accountName: "Cash",
          createdAt: "25.01.2025 at 22:44",
          balance: 400,
          totalIncome: 1000,
          totalExpense: 5000,
        },
        {
          _id: "64b0ee2c189286a5abc6b4ba",
          accountName: "Cash",
          createdAt: "25.01.2025 at 22:44",
          balance: 400,
          totalIncome: 1000,
          totalExpense: 5000,
        },
        {
          _id: "64b0ee2c189286a5abc6b4ba",
          accountName: "Cash",
          createdAt: "25.01.2025 at 22:44",
          balance: 400,
          totalIncome: 1000,
          totalExpense: 5000,
        },
      ]}
      createNew={
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Create a New Account</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create a New Account</SheetTitle>
              <SheetDescription>Fill the details of the new account. Click save when you're done.</SheetDescription>
            </SheetHeader>
            <CreateAccountForm />
          </SheetContent>
        </Sheet>
      }
    />
  );
};

export default AccountPageComponent;
