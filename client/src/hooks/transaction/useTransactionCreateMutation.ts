import { useMutation, useQueryClient } from "@tanstack/react-query";

import { controllers, methods, Requester, routes } from "@/shared/utils/requester";

const useTransactionCreateMutation = () => {
  const queryClient = useQueryClient();

  const createTransaction = useMutation({
    mutationKey: ["createTransactionMutation"],
    mutationFn: async (transactionCreateData: TransactionCreateRequestProps) => {
      const { accessToken, ...requestData } = transactionCreateData;
      const response = await new Requester({
        method: methods.post,
        endpoint: {
          route: routes.transaction,
          controller: controllers.create,
        },
        accessToken: accessToken,
        payload: requestData,
      }).send();

      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactionQuery"] }),
  });

  return createTransaction;
};

export default useTransactionCreateMutation;
