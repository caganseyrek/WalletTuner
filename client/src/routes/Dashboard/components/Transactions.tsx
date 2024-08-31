import { useTranslation } from "react-i18next";

import { GridColDef } from "@mui/x-data-grid";

import DataGrid from "@/components/DataGrid";

import useAccountQuery from "../hooks/account/useAccountQuery";
import useTransactionCreateMutation from "../hooks/transaction/useTransactionCreateMutation";
import useTransactionDeleteMutation from "../hooks/transaction/useTransactionDeleteMutation";
import useTransactionQuery from "../hooks/transaction/useTransactionQuery";
import useTransactionUpdateMutation from "../hooks/transaction/useTransactionUpdateMutation";
import useAuthDetails from "@/hooks/useAuthDetails";

interface transactionDataRowProps {
  id: number;
  uniqueId: string;
  belongsToAccount: string;
  belongsToUser: string;
  transactionType: string;
  transactionDescription: string;
  transactionDatetime: string;
  transactionValue: string;
}

const Transactions = () => {
  const { data: authDetails } = useAuthDetails();
  const { t } = useTranslation();

  const { mutateAsync: transactionCreateMutate, isError: transactionCreateError } =
    useTransactionCreateMutation();
  const { mutateAsync: transactionUpdateMutate, isError: transactionUpdateError } =
    useTransactionUpdateMutation();
  const { mutateAsync: transactionDeleteMutate, isError: transactionDeleteError } =
    useTransactionDeleteMutation();

  const queryPayload = {
    accessToken: authDetails!.accessToken,
    currentUser: authDetails!.currentUser,
  };
  const { data: transactions = [] } = useTransactionQuery(queryPayload);
  const { data: accounts = [] } = useAccountQuery(queryPayload);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: t("dashboard.transactions.columns.no"),
      width: 100,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "uniqueId",
      headerName: t("dashboard.transactions.columns.uniqueId"),
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "belongsToAccount",
      type: "singleSelect",
      headerName: t("dashboard.transactions.columns.belongsToAccount"),
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "transactionType",
      type: "singleSelect",
      headerName: t("dashboard.transactions.columns.type"),
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "transactionDescription",
      type: "string",
      headerName: t("dashboard.transactions.columns.description"),
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "transactionDatetime",
      type: "dateTime",
      headerName: t("dashboard.transactions.columns.dateTime"),
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "transactionValue",
      type: "number",
      headerName: t("dashboard.transactions.columns.value"),
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
  ];

  const transactionDataRow: transactionDataRowProps[] = transactions!.map(
    (transactionData, index) => ({
      id: index + 1,
      uniqueId: transactionData._id,
      belongsToAccount: accounts.find(
        (accountData) => accountData._id === transactionData.belongsToAccount,
      )!.accountName,
      belongsToUser: transactionData.belongsToUser,
      transactionType: transactionData.transactionType,
      transactionDescription: transactionData.transactionDescription,
      transactionDatetime: transactionData.transactionDatetime,
      transactionValue: transactionData.transactionValue,
    }),
  );

  return (
    <DataGrid<
      TransactionCreateRequestProps,
      TransactionUpdateRequestProps,
      TransactionDeleteRequestProps
    >
      key={transactions!.length} /* for reloading the data grid */
      rowsProp={transactionDataRow}
      columnsProp={columns}
      dataCategory="transaction"
      newDataIdentifier="description"
      newDataFunction={transactionCreateMutate}
      updateDataFunction={transactionUpdateMutate}
      deleteDataFunction={transactionDeleteMutate}
      isNewDataError={transactionCreateError}
      isUpdateDataError={transactionUpdateError}
      isDeleteDataError={transactionDeleteError}
      paginationModel={{
        page: 0,
        pageSize: 20,
      }}
    />
  );
};

export default Transactions;
