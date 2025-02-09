import React from "react";

import { Table } from "@tanstack/react-table";
import { Columns3 } from "lucide-react";

import { Button } from "@/components/base/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/base/dropdown-menu";

interface ColumnToggleProps<TData> {
  table: Table<TData>;
}

function ColumnToggle<TData>({ table }: ColumnToggleProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto hidden lg:flex">
          <Columns3 /> View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}>
              {column.id === "_id" ? "ID" : column.id.replaceAll("_", " ")}
            </DropdownMenuCheckboxItem>
          ))}
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={table.getIsAllColumnsVisible()}
          onCheckedChange={(value) => table.toggleAllColumnsVisible(!!value)}>
          Toggle All
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ColumnToggle;
