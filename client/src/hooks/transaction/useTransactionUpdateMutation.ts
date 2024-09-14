import { useMutation, useQueryClient } from "@tanstack/react-query";

import { controllers, methods, Requester, routes } from "@/shared/utils/requester";

const useTransactionUpdateMutation = () => {
  const queryClient = useQueryClient();

  const updateTransaction = useMutation({
    mutationKey: ["updateTransactionMutation"],
    mutationFn: async (transactionUpdateData: TransactionUpdateRequestProps) => {
      const { accessToken, ...requestData } = transactionUpdateData;
      const response = await new Requester({
        method: methods.patch,
        endpoint: {
          route: routes.transaction,
          controller: controllers.update,
        },
        accessToken: accessToken,
        payload: requestData,
      }).send();

      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactionQuery"] }),
  });

  return updateTransaction;
};

export default useTransactionUpdateMutation;
