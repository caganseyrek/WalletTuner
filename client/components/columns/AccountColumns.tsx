import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Pen, Trash } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";

import ColumnHeader from "../data_display/ColumnHeader";
import { Button } from "../ui/button";
import AccountHooksTypes from "@/types/account";
import GlobalTypes from "@/types/globals";
import HookTypes from "@/types/hook";

export interface AccountObject {
  _id: string;
  accountName: string;
  createdAt: string;
  balance: number;
  totalIncome: number;
  totalExpense: number;
}

interface GetAccountColumnsProps {
  formatterFn: ({ value }: HookTypes.FormatterParams) => string;
  deleteFn?: UseMutateAsyncFunction<
    GlobalTypes.BackendResponseParams<AccountObject>,
    Error,
    AccountHooksTypes.Mutations.DeleteRequestParams,
    unknown
  >;
}

export function getAccountColumns({ formatterFn, deleteFn }: GetAccountColumnsProps): ColumnDef<AccountObject>[] {
  const accountColumns: ColumnDef<AccountObject>[] = [
    {
      accessorKey: "select",
      enableHiding: false,
      enableSorting: false,
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select All"
          className="flex items-center justify-center"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select Row"
          className="flex items-center justify-center"
        />
      ),
    },
    {
      accessorKey: "_id",
      enableHiding: false,
      enableSorting: false,
      header: ({ column }) => <ColumnHeader column={column} title="Account ID" />,
    },
    {
      accessorKey: "accountName",
      header: ({ column }) => <ColumnHeader column={column} title="Account Name" />,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => <ColumnHeader column={column} title="Created At" />,
    },
    {
      accessorKey: "balance",
      header: ({ column }) => <ColumnHeader column={column} title="Balance" />,
      cell: ({ row }) => formatterFn({ value: row.original.balance }),
    },
    {
      accessorKey: "totalIncome",
      header: ({ column }) => <ColumnHeader column={column} title="Total Income" />,
      cell: ({ row }) => formatterFn({ value: row.original.totalIncome }),
    },
    {
      accessorKey: "totalExpense",
      header: ({ column }) => <ColumnHeader column={column} title="Total Expense" />,
      cell: ({ row }) => formatterFn({ value: row.original.totalExpense }),
    },
    {
      accessorKey: "actions",
      enableHiding: false,
      enableSorting: false,
      header: ({ column }) => <ColumnHeader column={column} title="Actions" />,
      cell: () => (
        <div className="flex items-center justify-end">
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0" onClick={() => {}}>
            <Pen className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];
  return accountColumns;
}
