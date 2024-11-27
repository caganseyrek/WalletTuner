import { useMutation, useQueryClient } from "@tanstack/react-query";

import { controllers, methods, Requester, routes } from "@/utils/requester";

const useTransactionDeleteMutation = () => {
  const queryClient = useQueryClient();

  const deleteTransaction = useMutation({
    mutationKey: ["deleteTransactionMutation"],
    mutationFn: async (transactionDeleteData: TransactionDeleteRequestProps) => {
      const { accessToken, ...requestData } = transactionDeleteData;
      const response = await new Requester({
        method: methods.delete,
        endpoint: {
          route: routes.transaction,
          controller: controllers.delete,
        },
        accessToken: accessToken,
        payload: requestData,
      }).send();

      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactionQuery"] }),
  });

  return deleteTransaction;
};

export default useTransactionDeleteMutation;
