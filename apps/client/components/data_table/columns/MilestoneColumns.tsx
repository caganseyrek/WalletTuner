"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Milestone } from "@wallettuner/resource-types";
import { CircleCheckBig, CircleFadingArrowUp, CircleOff, Timer, Trash2 } from "lucide-react";

import { Button } from "@/components/base/button";
import { Checkbox } from "@/components/base/checkbox";
import { Progress } from "@/components/base/progress";

import Formatter from "@/shared/lib/formatter";

import MilestoneDialog from "../dialogs/MilestoneDialog";
import ColumnHeader from "../partial/ColumnHeader";

export const milestoneColumns: ColumnDef<Milestone.MilestonePropsWithString>[] = [
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
    enableHiding: false,
  },
  {
    accessorKey: "account_id",
    header: ({ column }) => <ColumnHeader column={column} title={"Account ID"} />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <ColumnHeader column={column} title={"Name"} />,
  },
  {
    accessorKey: "target_amount",
    header: ({ column }) => <ColumnHeader column={column} title={"Target Amount"} />,
    cell: ({ row }) => Formatter.formatCurrency(parseInt(row.getValue("target_amount"))),
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => <ColumnHeader column={column} title={"Start Date"} />,
    cell: ({ row }) => Formatter.formatDate(row.original.start_date),
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => <ColumnHeader column={column} title={"End Date"} />,
    cell: ({ row }) => Formatter.formatDate(row.original.start_date),
  },
  {
    accessorKey: "progress",
    header: ({ column }) => <ColumnHeader column={column} title={"Progress"} />,
    cell: ({ row }) => {
      return (
        <div className="flex flex-row items-center justify-start gap-1">
          <span className="text-muted-foreground text-sm">{row.original.progress}%</span>
          <Progress value={row.original.progress} />
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <ColumnHeader column={column} title={"Status"} />,
    cell: ({ row }) => {
      if (row.original.status === "not_started") {
        return (
          <div className="flex flex-row items-center justify-start gap-1 text-sm text-muted-foreground">
            <CircleFadingArrowUp className="w-4 h-4 min-w-4 min-h-4" />
            Not Started
          </div>
        );
      }
      if (row.original.status === "success") {
        return (
          <div className="flex flex-row items-center justify-start gap-1 text-sm text-muted-foreground">
            <CircleCheckBig className="w-4 h-4 min-w-4 min-h-4" />
            Success
          </div>
        );
      }
      if (row.original.status === "ongoing") {
        return (
          <div className="flex flex-row items-center justify-start gap-1 text-sm text-muted-foreground">
            <Timer className="w-4 h-4 min-w-4 min-h-4 mb-0.5" />
            Ongoing
          </div>
        );
      }
      return (
        <div className="flex flex-row items-center justify-start gap-1 text-sm text-muted-foreground">
          <CircleOff className="w-4 h-4 min-w-4 min-h-4" />
          Failed
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <span className="select-none hover:text-foreground">Actions</span>,
    cell: ({ row }) => (
      <div className="w-full flex items-center justify-end">
        <MilestoneDialog milestone={row.original} />
        <Button variant="ghost" size="icon">
          <Trash2 />
        </Button>
      </div>
    ),
    enableHiding: false,
  },
];
