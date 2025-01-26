import React from "react";

import { Table } from "@tanstack/react-table";

import { Input } from "../ui/input";

interface TableSearchProps<TData> {
  table: Table<TData>;
  placeholder: string;
  searchColumn: string;
}

function TableSearch<TData>({ table, placeholder, searchColumn }: TableSearchProps<TData>) {
  return (
    <Input
      placeholder={`Filter by ${placeholder}...`}
      value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
      onChange={(event) => table.getColumn(searchColumn)?.setFilterValue(event.target.value)}
      className="max-w-sm w-[300px]"
    />
  );
}

export default TableSearch;
