import { useQuery } from "@tanstack/react-query";

import { controllers, methods, Requester, routes } from "@/shared/utils/requester";

const useTransactionQuery = (transactionQueryData: TransactionQueryRequestProps) => {
  const transaction = useQuery({
    queryKey: ["transactionQuery", transactionQueryData],
    queryFn: async () => {
      const { accessToken, ...requestData } = transactionQueryData;
      const response = await new Requester({
        method: methods.post,
        endpoint: {
          route: routes.transaction,
          controller: controllers.getDetailsAll,
        },
        accessToken: accessToken,
        payload: requestData,
      }).send<TransactionQueryResponseProps[]>();

      return response;
    },
  });

  return transaction;
};

export default useTransactionQuery;
