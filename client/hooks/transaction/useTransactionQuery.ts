import GlobalTypes from "@/types/globals";
import TransactionTypes from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";
import { EasyRequester } from "easy-requester";

const useTransactionQuery = (transactionQueryData: TransactionTypes.Queries.TransactionQueryRequestProps) => {
  const transactions = useQuery({
    queryKey: ["transactionQuery", transactionQueryData],
    queryFn: async () => {
      const { accessToken, ...requestData } = transactionQueryData;
      const response = await new EasyRequester()
        .setConfig({
          method: "PATCH",
          endpoint: { route: "transaction", action: "all" },
          accessToken: accessToken,
          payload: requestData,
        })
        .sendRequest<GlobalTypes.BackendResponseParams<TransactionTypes.Queries.TransactionQueryResponseProps[]>>();
      return response;
    },
  });
  return transactions;
};

export default useTransactionQuery;
