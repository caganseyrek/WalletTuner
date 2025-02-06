"use client";

import React from "react";

import useAccountQuery from "@/hooks/account/useAccountQuery";

import { accountColumns } from "@/components/data_display/columns/AccountColumns";
import DataTable from "@/components/data_display/DataTable";
import AccountDialog from "@/components/data_display/edit_dialogs/AccountDialog";

const AccountsPage = () => {
  const { isLoading: isAccountQueryLoading, error: accountQueryError, data: accounts } = useAccountQuery();

  if (isAccountQueryLoading) {
    return "loading...";
  }

  if (accountQueryError) {
    return "error";
  }

  return <DataTable columns={accountColumns} data={accounts?.data ?? []} createDialog={<AccountDialog />} />;
};

export default AccountsPage;
