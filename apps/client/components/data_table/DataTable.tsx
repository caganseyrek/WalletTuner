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
  VisibilityState,
} from "@tanstack/react-table";

import { Input } from "@/components/base/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  createSheet: React.ReactNode;
  visibilities: VisibilityState;
  isLoading: boolean;
  isError: Error | null;
  isNotFound: boolean;
}

const DataTable = <TData, TValue>({
  columns,
  data,
  createSheet,
  visibilities,
  isLoading = false,
  isError = null,
  isNotFound = false,
}: DataTableProps<TData, TValue>) => {
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
    initialState: {
      columnVisibility: visibilities,
    },
  });

  return (
    <div className="w-[calc(100vw-17rem)] min-w-[calc(100vw-17rem)] max-w-[calc(100vw-17rem)] min-h-dvh max-h-dvh h-dvh flex flex-1 flex-col items-center justify-start py-4 px-8">
      <section className="w-full flex items-center justify-between pb-4 gap-2">
        {createSheet}
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
      <div className="h-dvh w-full flex flex-1">
        {isLoading ? (
          <LoadingOverlay />
        ) : isError ? (
          <ErrorOverlay />
        ) : isNotFound || data.length === 0 || data.length < 1 ? (
          <NotFoundOverlay />
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => (
                    <TableHead key={header.id} className={index === headerGroup.headers.length - 1 ? "text-right" : ""}>
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
                        className={index === row.getVisibleCells().length - 1 ? "text-right" : ""}>
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
        )}
      </div>
      <Pagination table={table} />
    </div>
  );
};

export default DataTable;
