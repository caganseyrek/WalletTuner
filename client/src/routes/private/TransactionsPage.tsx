import { useTranslation } from "react-i18next";

import { GridColDef, GridPreProcessEditCellProps } from "@mui/x-data-grid";

import DataGrid from "@/components/DataGrid";
import GridOverlay from "@/components/GridOverlay";

import useAccountQuery from "@/hooks/account/useAccountQuery";
import useTransactionCreateMutation from "@/hooks/transaction/useTransactionCreateMutation";
import useTransactionDeleteMutation from "@/hooks/transaction/useTransactionDeleteMutation";
import useTransactionQuery from "@/hooks/transaction/useTransactionQuery";
import useTransactionUpdateMutation from "@/hooks/transaction/useTransactionUpdateMutation";
import useAuthDetails from "@/hooks/useAuthDetails";

interface transactionDataRowProps {
  id: number;
  uniqueId: string;
  belongsToAccount: string;
  transactionType: string;
  transactionDescription: string;
  transactionDatetime: string;
  transactionValue: string;
}

const TransactionsPage = () => {
  const { data: authDetails } = useAuthDetails();
  const { t } = useTranslation(["data_grid"]);

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
      field: "belongsToAccount",
      type: "singleSelect",
      headerName: t("transactions.columns.belongsToAccount"),
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
      field: "transactionType",
      type: "singleSelect",
      headerName: t("transactions.columns.type"),
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
      field: "transactionDatetime",
      type: "dateTime",
      headerName: t("transactions.columns.dateTime"),
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
      field: "transactionValue",
      type: "number",
      headerName: t("transactions.columns.value"),
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value.length === 0;
        return { ...params.props, error: hasError };
      },
    },
  ];

  const transactionsNewDataObject: Omit<transactionDataRowProps, "id"> = {
    uniqueId: "",
    belongsToAccount: "",
    transactionType: "",
    transactionDescription: "",
    transactionDatetime: "",
    transactionValue: "",
  };

  const transactionDataRow: transactionDataRowProps[] = transactions!.map(
    (transactionData, index) => ({
      id: index + 1,
      uniqueId: transactionData._id,
      belongsToAccount: accounts.find(
        (accountData) => accountData._id === transactionData.belongsToAccount,
      )!.accountName,
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
      newDataObject={transactionsNewDataObject}
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

export default TransactionsPage;
