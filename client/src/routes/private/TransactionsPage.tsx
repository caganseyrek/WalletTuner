import { useTranslation } from "react-i18next";

import { GridColDef, GridPreProcessEditCellProps } from "@mui/x-data-grid";
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

interface transactionDataRowProps {
  id: number;
  uniqueId: string;
  accountId: string;
  transactionType: string;
  transactionDescription: string;
  transactionDateTime: string;
  transactionValue: number;
}

const TransactionsPage = () => {
  const { data: authDetails } = useAuthDetails();
  const { t } = useTranslation(["data_grid"]);

  const format = useFormatter();

  const { mutateAsync: transactionCreateMutate } = useTransactionCreateMutation();
  const { mutateAsync: transactionUpdateMutate } = useTransactionUpdateMutation();
  const { mutateAsync: transactionDeleteMutate } = useTransactionDeleteMutation();

  dayjs.extend(customParseFormat);

  const queryPayload = {
    accessToken: authDetails!.accessToken,
    currentUser: authDetails!.currentUser,
  };
  const { data: transactionQueryData, isLoading: isTransactionLoading } =
    useTransactionQuery(queryPayload);
  const { data: accountQueryData, isLoading: isAccountLoading } = useAccountQuery(queryPayload);

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

  const availableAccounts: { uniqueId: string; accountName: string }[] = accounts.map(
    (accountData) => ({
      uniqueId: accountData._id,
      accountName: accountData.accountName,
    }),
  );

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
      field: "uniqueId",
      headerName: t("transactions.columns.uniqueId"),
      flex: 1,
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
      valueOptions: availableAccounts.map((account) => account.accountName),
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value.length === 0;
        return { ...params.props, error: hasError };
      },
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
        t("transactions.transactionType.income"),
        t("transactions.transactionType.expense"),
      ],
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value.length === 0;
        return { ...params.props, error: hasError };
      },
    },
    {
      field: "transactionDescription",
      type: "string",
      headerName: t("transactions.columns.description"),
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
      field: "transactionDateTime",
      type: "dateTime",
      headerName: t("transactions.columns.dateTime"),
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
      valueFormatter: (value) => dayjs(value).format("DD/MM/YYYY, HH:mm:ss"),
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value.length === 0;
        return { ...params.props, error: hasError };
      },
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
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value.length === 0;
        return { ...params.props, error: hasError };
      },
    },
  ];

  const transactionsNewDataObject: Omit<transactionDataRowProps, "id"> = {
    uniqueId: "",
    accountId: "",
    transactionType: "",
    transactionDescription: "",
    transactionDateTime: "",
    transactionValue: 0,
  };

  const transactionDataRow: transactionDataRowProps[] = transactions.map(
    (transactionData, index) => ({
      id: index + 1,
      uniqueId: transactionData._id,
      accountId: accounts.find((accountData) => accountData._id === transactionData.accountId)!
        .accountName,
      transactionType: transactionData.transactionType,
      transactionDescription: transactionData.transactionDescription,
      transactionDateTime: transactionData.transactionDateTime,
      transactionValue: transactionData.transactionValue,
    }),
  );

  return (
    <DataGrid<
      TransactionCreateRequestProps,
      TransactionUpdateRequestProps,
      TransactionDeleteRequestProps
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
