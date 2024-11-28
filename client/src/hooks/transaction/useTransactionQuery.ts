import TransactionTypes from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";

import Requester from "@/utils/requester";

const useTransactionQuery = (
  transactionQueryData: TransactionTypes.Queries.TransactionQueryRequestProps,
) => {
  const transaction = useQuery({
    queryKey: ["transactionQuery", transactionQueryData],
    queryFn: async () => {
      const { accessToken, ...requestData } = transactionQueryData;
      const response = await new Requester({
        method: "PATCH",
        endpoint: { route: "transaction", action: "all" },
        accessToken: accessToken,
        payload: requestData,
      }).sendRequest<TransactionTypes.Queries.TransactionQueryRequestProps[]>();

      return response;
    },
  });

  return transaction;
};

export default useTransactionQuery;
