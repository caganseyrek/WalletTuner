"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Account } from "@wallettuner/resource-types";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/base/button";
import { Checkbox } from "@/components/base/checkbox";

import Formatter from "@/shared/lib/formatter";

import AccountDialog from "../dialogs/AccountDialog";
import ColumnHeader from "../partial/ColumnHeader";

export const accountColumns: ColumnDef<Account.AccountPropsWithString>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        style={{ verticalAlign: "middle" }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        style={{ verticalAlign: "middle" }}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "_id",
    header: ({ column }) => <ColumnHeader column={column} title={"ID"} />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <ColumnHeader column={column} title={"Name"} />,
  },
  {
    accessorKey: "balance",
    header: ({ column }) => <ColumnHeader column={column} title={"Balance"} />,
    cell: ({ row }) => Formatter.formatCurrency(parseInt(row.getValue("balance"))),
  },
  {
    accessorKey: "total_income",
    header: ({ column }) => <ColumnHeader column={column} title={"Total Income"} />,
    cell: ({ row }) => Formatter.formatCurrency(parseInt(row.getValue("total_income"))),
  },
  {
    accessorKey: "total_expense",
    header: ({ column }) => <ColumnHeader column={column} title={"Total Expense"} />,
    cell: ({ row }) => Formatter.formatCurrency(parseInt(row.getValue("total_expense"))),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => <ColumnHeader column={column} title={"Created At"} />,
  },
  {
    id: "actions",
    header: () => <span className="select-none hover:text-foreground">Actions</span>,
    cell: ({ row }) => (
      <>
        <AccountDialog account={row.original} />
        <Button variant="ghost" size="icon">
          <Trash2 />
        </Button>
      </>
    ),
  },
];
