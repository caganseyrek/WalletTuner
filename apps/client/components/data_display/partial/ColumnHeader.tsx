import React from "react";

import { Column } from "@tanstack/react-table";
import { AlignLeft, ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react";

import { Button } from "@/components/base/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/base/dropdown-menu";

import { cn } from "@/shared/lib/twUtils";

interface ColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

const ColumnHeader = <TData, TValue>({ column, title, className }: ColumnHeaderProps<TData, TValue>) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="-ml-3 h-8 px-2 data-[state=open]:bg-accent">
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp />
            ) : (
              <ChevronsUpDown />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Sorting</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" /> Ascending
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" /> Descending
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.clearSorting()}>
            <AlignLeft className="h-3.5 w-3.5 text-muted-foreground/70" /> Reset Sorting
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Visibility</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70" /> Hide Column
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ColumnHeader;
