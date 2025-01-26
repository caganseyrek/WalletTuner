import React from "react";

import { Metadata } from "next";

import AccountPageComponent from "@/components/pages/AccountPageComponent";

export const metadata: Metadata = {
  title: "Accounts - WalletTuner",
};

const AccountsPage = () => {
  return <AccountPageComponent />;
};

export default AccountsPage;
