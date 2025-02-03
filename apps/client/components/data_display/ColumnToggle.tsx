import React from "react";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Table } from "@tanstack/react-table";
import { Settings2 } from "lucide-react";

import { Button } from "../../../../packages/interface/src/components/base/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../../../../packages/interface/src/components/base/dropdown-menu";

interface ColumnToggleProps<TData> {
  table: Table<TData>;
}

function ColumnToggle<TData>({ table }: ColumnToggleProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto hidden h-[36px] lg:flex">
          <Settings2 />
          View
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
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
        <DropdownMenuSeparator />
        <Button variant="ghost" className="capitalize w-full text-sm" onClick={() => table.toggleAllColumnsVisible()}>
          {table.getIsAllColumnsVisible() ? "Untoggle All" : "Toggle All"}
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ColumnToggle;
