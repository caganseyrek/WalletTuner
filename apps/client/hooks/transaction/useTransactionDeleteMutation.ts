import { useMutation, useQueryClient } from "@tanstack/react-query";

import { EasyRequester } from "@/lib/EasyRequester/src";

import TransactionTypes from "@/types/transaction";

const useTransactionDeleteMutation = () => {
  const queryClient = useQueryClient();

  const deleteTransaction = useMutation({
    mutationKey: ["deleteTransactionMutation"],
    mutationFn: async (transactionDeleteData: TransactionTypes.Mutations.DeleteRequestParams) => {
      const response = await new EasyRequester()
        .setConfig({
          requestConfig: {
            method: "DELETE",
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "transaction", action: "deleteTransaction" },
            payload: transactionDeleteData,
            includeCookies: true,
          },
        })
        .sendRequest();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactionQuery"] }),
  });
  return deleteTransaction;
};

export default useTransactionDeleteMutation;
