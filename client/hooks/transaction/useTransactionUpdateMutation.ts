import { useMutation, useQueryClient } from "@tanstack/react-query";

import { EasyRequester } from "@/lib/EasyRequester/src";

import TransactionTypes from "@/types/transaction";

const useTransactionUpdateMutation = () => {
  const queryClient = useQueryClient();

  const updateTransaction = useMutation({
    mutationKey: ["updateTransactionMutation"],
    mutationFn: async (transactionUpdateData: TransactionTypes.Mutations.UpdateRequestParams) => {
      const response = await new EasyRequester()
        .setConfig({
          requestConfig: {
            method: "PATCH",
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "transaction", action: "updateTransaction" },
            payload: transactionUpdateData,
            includeCookies: true,
          },
        })
        .sendRequest();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactionQuery"] }),
  });
  return updateTransaction;
};

export default useTransactionUpdateMutation;
