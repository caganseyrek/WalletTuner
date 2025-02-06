"use client";

import React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Table as ReactTable,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "../base/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../base/table";
import ColumnToggle from "./partial/ColumnToggle";
import Pagination from "./partial/Pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  createDialog: React.ReactNode;
}

const DataTable = <TData, TValue>({ columns, data, createDialog }: DataTableProps<TData, TValue>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [globalFilter, setGlobalFilter] = React.useState<any>([]);

  const table: ReactTable<TData> = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    state: { globalFilter },
  });

  return (
    <div className="py-4 px-8">
      <section className="flex items-center justify-between pb-2">
        {createDialog}
        <div className="flex flex-row items-center justify-center space-x-2">
          <Input
            value={globalFilter}
            onChange={(event) => table.setGlobalFilter(String(event.target.value))}
            placeholder="Type to filter..."
            className="w-[20rem]"
          />
          <ColumnToggle table={table} />
        </div>
      </section>
      <Table>
        <TableHeader className="border-t">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <TableHead
                  key={header.id}
                  className={`[&>[role=checkbox]]:translate-y-[-2px] [&:has([role=checkbox])]:pr-2 ${index === headerGroup.headers.length - 1 && "text-right"}`}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={`py-1 [&>[role=checkbox]]:translate-y-[-2px] [&:has([role=checkbox])]:pr-2 ${index === row.getAllCells().length - 1 && "text-right"}`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>No data to display.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination table={table} />
    </div>
  );
};

export default DataTable;
