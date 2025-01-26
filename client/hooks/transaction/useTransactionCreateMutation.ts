import { useMutation, useQueryClient } from "@tanstack/react-query";

import { EasyRequester } from "@/lib/EasyRequester/src";

import TransactionTypes from "@/types/transaction";

const useTransactionCreateMutation = () => {
  const queryClient = useQueryClient();

  const createTransaction = useMutation({
    mutationKey: ["createTransactionMutation"],
    mutationFn: async (transactionCreateData: TransactionTypes.Mutations.CreateRequestParams) => {
      const response = await new EasyRequester()
        .setConfig({
          requestConfig: {
            method: "POST",
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "transaction", action: "createTransaction" },
            payload: transactionCreateData,
            includeCookies: true,
          },
        })
        .sendRequest();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactionQuery"] }),
  });
  return createTransaction;
};

export default useTransactionCreateMutation;
