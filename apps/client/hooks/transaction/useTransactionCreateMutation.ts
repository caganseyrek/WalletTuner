import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/shared/types/globals";

const useTransactionCreateMutation = () => {
  const queryClient = useQueryClient();

  const createTransaction = useMutation({
    mutationKey: ["createTransactionMutation"],
    mutationFn: async (transactionCreateData: Transaction.Hook.CreateProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "transaction", action: "createTransaction" },
          },
          header: { method: "POST" },
          auth: { includeCookies: true },
          payload: transactionCreateData,
        })
        .sendRequest<ServerResponseParams<null>, Transaction.Hook.CreateProps>();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactionQuery"] }),
  });
  return createTransaction;
};

export default useTransactionCreateMutation;
