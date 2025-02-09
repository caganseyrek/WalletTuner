import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/shared/types/globals";

const useTransactionUpdateMutation = () => {
  const queryClient = useQueryClient();

  const updateTransaction = useMutation({
    mutationKey: ["updateTransactionMutation"],
    mutationFn: async (transactionUpdateData: Transaction.Hook.UpdateProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "transaction", action: "updateTransaction" },
          },
          header: { method: "PATCH" },
          auth: { includeCookies: true },
          payload: transactionUpdateData,
        })
        .sendRequest<ServerResponseParams<null>, Transaction.Hook.UpdateProps>();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactionQuery"] }),
  });
  return updateTransaction;
};

export default useTransactionUpdateMutation;
