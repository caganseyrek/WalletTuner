import { useQuery } from "@tanstack/react-query";

import { TransactionObject } from "@/components/columns/TransactionColumns";

import { EasyRequester } from "@/lib/EasyRequester/src";

import GlobalTypes from "@/types/globals";
import TransactionTypes from "@/types/transaction";

const useTransactionQuery = (transactionQueryData: TransactionTypes.Queries.TransactionQueryRequestProps) => {
  const transactions = useQuery({
    queryKey: ["transactionQuery", transactionQueryData],
    queryFn: async () => {
      const response = await new EasyRequester()
        .setConfig({
          requestConfig: {
            method: "PATCH",
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "transaction", action: "getAllTransactions" },
            payload: transactionQueryData,
            includeCookies: true,
          },
        })
        .sendRequest<GlobalTypes.BackendResponseParams<TransactionObject[]>>();
      return response;
    },
  });
  return transactions;
};

export default useTransactionQuery;
