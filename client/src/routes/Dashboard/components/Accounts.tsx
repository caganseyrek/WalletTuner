import { useTranslation } from "react-i18next";

import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

import DataGrid from "@/components/DataGrid";

import useAccountCreateMutation from "../hooks/account/useAccountCreateMutation";
import useAccountDeleteMutation from "../hooks/account/useAccountDeleteMutation";
import useAccountQuery from "../hooks/account/useAccountQuery";
import useAccountUpdateMutation from "../hooks/account/useAccountUpdateMutation";
import useAuthDetails from "@/hooks/useAuthDetails";

interface accountDataRowProps {
  id: number;
  uniqueId: string;
  accountName: string;
  balance: number;
  createdAt: string;
}

const Accounts = () => {
  const { data: authData } = useAuthDetails();
  const { t } = useTranslation();

  const { mutateAsync: accounteCreateMutate, isError: accountCreateError } =
    useAccountCreateMutation();
  const { mutateAsync: accounteUpdateMutate, isError: accountUpdateError } =
    useAccountUpdateMutation();
  const { mutateAsync: accounteDeleteMutate, isError: accountDeleteError } =
    useAccountDeleteMutation();
  const { data: accounts } = useAccountQuery({
    accessToken: authData!.accessToken,
    currentUser: authData!.currentUser,
  });

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: t("dashboard.accounts.columns.no"),
      width: 70,
      editable: false,
      align: "left",
    },
    {
      field: "accountName",
      type: "string",
      headerName: t("dashboard.accounts.columns.accountName"),
      width: 175,
      editable: true,
      align: "left",
    },
    {
      field: "balance",
      type: "number",
      headerName: t("dashboard.accounts.columns.balance"),
      width: 100,
      editable: false,
      align: "left",
    },
    {
      field: "createdAt",
      headerName: t("dashboard.accounts.columns.createdAt"),
      width: 200,
      editable: false,
      align: "left",
    },
    {
      field: "uniqueId",
      headerName: t("dashboard.accounts.columns.uniqueId"),
      width: 150,
      editable: false,
      align: "left",
    },
  ];

  const accountRowData: accountDataRowProps[] = accounts!.map((accountData, index) => ({
    id: index + 1,
    uniqueId: accountData._id,
    accountName: accountData.accountName,
    balance: accountData.balance,
    createdAt: dayjs(accountData.createdAt).format("DD/MM/YYYY - HH:mm:ss"),
  }));

  return (
    <DataGrid<AccountCreateRequestProps, AccountUpdateRequestProps, AccountDeleteRequestProps>
      key={accounts?.length} /* for reloading the data grid */
      rowsProp={accountRowData}
      columnsProp={columns}
      dataCategory="account"
      newDataFunction={accounteCreateMutate}
      updateDataFunction={accounteUpdateMutate}
      deleteDataFunction={accounteDeleteMutate}
      isNewDataError={accountCreateError}
      isUpdateDateError={accountUpdateError}
      isDeleteDataError={accountDeleteError}
      paginationModel={{
        page: 0,
        pageSize: 5,
      }}
    />
  );
};

export default Accounts;
