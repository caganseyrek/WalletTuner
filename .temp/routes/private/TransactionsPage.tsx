import { useTranslation } from "react-i18next";

import PageTypes from "@/types/routes";
import TransactionTypes from "@/types/transaction";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import DataGrid from "@/components/DataGrid";
import GridOverlay from "@/components/GridOverlay";

import useAccountQuery from "@/hooks/account/useAccountQuery";
import useTransactionCreateMutation from "@/hooks/transaction/useTransactionCreateMutation";
import useTransactionDeleteMutation from "@/hooks/transaction/useTransactionDeleteMutation";
import useTransactionQuery from "@/hooks/transaction/useTransactionQuery";
import useTransactionUpdateMutation from "@/hooks/transaction/useTransactionUpdateMutation";
import useAuthDetails from "@/hooks/useAuthDetails";
import useFormatter from "@/hooks/useFormatter";

const TransactionsPage = () => {
  const { data: authDetails } = useAuthDetails();
  const { t } = useTranslation(["data_grid"]);

  const format = useFormatter();

  const { mutateAsync: transactionCreateMutate } =
    useTransactionCreateMutation();
  const { mutateAsync: transactionUpdateMutate } =
    useTransactionUpdateMutation();
  const { mutateAsync: transactionDeleteMutate } =
    useTransactionDeleteMutation();

  dayjs.extend(customParseFormat);

  const queryPayload = {
    accessToken: authDetails!.accessToken,
    currentUser: authDetails!.currentUser,
  };
  const { data: transactionQueryData, isLoading: isTransactionLoading } =
    useTransactionQuery(queryPayload);
  const { data: accountQueryData, isLoading: isAccountLoading } =
    useAccountQuery(queryPayload);

  if (isAccountLoading || isTransactionLoading) {
    return <GridOverlay type="loading" />;
  }

  if (!accountQueryData?.isSuccess || !transactionQueryData?.isSuccess) {
    return <GridOverlay type="error" message={transactionQueryData?.message} />;
  }

  const accounts = accountQueryData.data;
  const transactions = transactionQueryData.data;

  if (!accounts || !transactions) {
    return <GridOverlay type="error" message={transactionQueryData?.message} />;
  }

  const availableAccounts: { uniqueId: string; accountName: string }[] =
    accounts.map((accountData) => ({
      uniqueId: accountData._id,
      accountName: accountData.accountName,
    }));

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: t("transactions.columns.no"),
      width: 100,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "accountId",
      type: "singleSelect",
      headerName: t("transactions.columns.accountId"),
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
      valueOptions: availableAccounts.map((account) => ({
        value: account.uniqueId,
        label: account.accountName,
      })),
    },
    {
      field: "transactionType",
      type: "singleSelect",
      headerName: t("transactions.columns.type"),
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
      valueOptions: [
        { label: t("transactions.transactionType.income"), value: "inc" },
        { label: t("transactions.transactionType.expense"), value: "exp" },
      ],
    },
    {
      field: "transactionDescription",
      type: "string",
      headerName: t("transactions.columns.description"),
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "transactionDateTime",
      type: "dateTime",
      headerName: t("transactions.columns.dateTime"),
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
      valueFormatter: (value) => dayjs(value).format("DD/MM/YYYY, HH:mm:ss"),
    },
    {
      field: "transactionValue",
      type: "number",
      headerName: t("transactions.columns.value"),
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
      valueFormatter: (value: number) => format({ value: value }),
    },
    {
      field: "uniqueId",
      headerName: t("transactions.columns.uniqueId"),
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
  ];

  const transactionsNewDataObject: Omit<
    PageTypes.TransactionDataRowProps,
    "id"
  > = {
    uniqueId: "",
    accountId: "",
    transactionType: "exp",
    transactionDescription: "",
    transactionDateTime: "",
    transactionValue: 0,
  };

  const transactionDataRow: PageTypes.TransactionDataRowProps[] =
    transactions.map((transactionData, index) => ({
      id: index + 1,
      uniqueId: transactionData._id,
      accountId: accounts.find(
        (accountData) => accountData._id === transactionData.accountId,
      )!._id,
      transactionType: transactionData.transactionType,
      transactionDescription: transactionData.transactionDescription,
      transactionDateTime: transactionData.transactionDateTime,
      transactionValue: transactionData.transactionValue,
    }));

  return (
    <DataGrid<
      TransactionTypes.Mutations.CreateRequestParams,
      TransactionTypes.Mutations.UpdateRequestParams,
      TransactionTypes.Mutations.DeleteRequestParams
    >
      key={JSON.stringify(transactionDataRow)}
      rowsProp={transactionDataRow}
      columnsProp={columns}
      dataCategory="transaction"
      newDataObject={transactionsNewDataObject}
      newDataFunction={transactionCreateMutate}
      updateDataFunction={transactionUpdateMutate}
      deleteDataFunction={transactionDeleteMutate}
    />
  );
};

export default TransactionsPage;
