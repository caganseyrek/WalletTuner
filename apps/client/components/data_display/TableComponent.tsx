"use client";

import React, { ReactNode } from "react";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Plus } from "lucide-react";

import { Button } from "../../../../packages/interface/src/components/base/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../packages/interface/src/components/base/table";
import ColumnToggle from "./ColumnToggle";
import TableSearch from "./TableSearch";

interface TableComponentProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  createNew: ReactNode;
}

function TableComponent<TData, TValue>({ columns, data, createNew }: TableComponentProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="flex flex-row items-center justify-between border-b py-3 px-6 text-sm h-[61px]">
        <div className="flex flex-row items-center justify-center gap-3">
          <TableSearch table={table} placeholder={"account name"} searchColumn={"accountName"} />
          <ColumnToggle table={table} />
        </div>
        {createNew}
      </div>
      <Table>
        <TableHeader className="bg-[#fafafa]">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent h-[44px]">
              {headerGroup.headers.map((header, index) => (
                <TableHead
                  key={header.id}
                  className={`h-[44px] ${index === 0 && "pl-6"} ${index === headerGroup.headers.length - 1 && "pr-6 text-right"}`}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="h-[44px]">
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={`py-2.5 h-[44px] ${index === 0 && "pl-6"} ${index === row.getVisibleCells().length - 1 && "pr-6"}`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columns.length} className="h-[calc(100vh-101px)] text-center">
                Nothing to see here...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default TableComponent;
