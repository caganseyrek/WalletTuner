import { useTranslation } from "react-i18next";

import { GridColDef, GridPreProcessEditCellProps } from "@mui/x-data-grid";
import dayjs from "dayjs";

import DataGrid from "@/components/DataGrid";

import useAccountCreateMutation from "@/hooks/account/useAccountCreateMutation";
import useAccountDeleteMutation from "@/hooks/account/useAccountDeleteMutation";
import useAccountQuery from "@/hooks/account/useAccountQuery";
import useAccountUpdateMutation from "@/hooks/account/useAccountUpdateMutation";
import useAuthDetails from "@/hooks/useAuthDetails";

interface accountDataRowProps {
  id: number;
  uniqueId: string;
  accountName: string;
  balance: string;
  createdAt: string;
}

const AccountsPage = () => {
  const { data: authDetails } = useAuthDetails();
  const { t } = useTranslation();

  const { mutateAsync: accounteCreateMutate, isError: accountCreateError } =
    useAccountCreateMutation();
  const { mutateAsync: accounteUpdateMutate, isError: accountUpdateError } =
    useAccountUpdateMutation();
  const { mutateAsync: accounteDeleteMutate, isError: accountDeleteError } =
    useAccountDeleteMutation();
  const { data: accounts = [] } = useAccountQuery({
    accessToken: authDetails!.accessToken,
    currentUser: authDetails!.currentUser,
  });

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: t("dashboard.accounts.columns.no"),
      width: 100,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "accountName",
      type: "string",
      headerName: t("dashboard.accounts.columns.accountName"),
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value.length === 0;
        return { ...params.props, error: hasError };
      },
    },
    {
      field: "balance",
      type: "number",
      headerName: t("dashboard.accounts.columns.balance"),
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "createdAt",
      headerName: t("dashboard.accounts.columns.createdAt"),
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "uniqueId",
      headerName: t("dashboard.accounts.columns.uniqueId"),
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
  ];

  const accountsNewDataObject: Omit<accountDataRowProps, "id"> = {
    uniqueId: "",
    accountName: "",
    balance: "0",
    createdAt: "",
  };

  const accountDataRow: accountDataRowProps[] = accounts!.map((accountData, index) => ({
    id: index + 1,
    uniqueId: accountData._id,
    accountName: accountData.accountName,
    balance: accountData.balance.toString(),
    createdAt: dayjs(accountData.createdAt).format("DD/MM/YYYY - HH:mm:ss"),
  }));

  return (
    <DataGrid<AccountCreateRequestProps, AccountUpdateRequestProps, AccountDeleteRequestProps>
      key={accounts?.length} /* for reloading the data grid */
      rowsProp={accountDataRow}
      columnsProp={columns}
      dataCategory="account"
      newDataIdentifier="name"
      newDataObject={accountsNewDataObject}
      newDataFunction={accounteCreateMutate}
      updateDataFunction={accounteUpdateMutate}
      deleteDataFunction={accounteDeleteMutate}
      isNewDataError={accountCreateError}
      isUpdateDataError={accountUpdateError}
      isDeleteDataError={accountDeleteError}
    />
  );
};

export default AccountsPage;
