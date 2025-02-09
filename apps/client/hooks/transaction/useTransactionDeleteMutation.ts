import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/shared/types/globals";

const useTransactionDeleteMutation = () => {
  const queryClient = useQueryClient();

  const deleteTransaction = useMutation({
    mutationKey: ["deleteTransactionMutation"],
    mutationFn: async (transactionDeleteData: Transaction.Hook.DeleteProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "transaction", action: "deleteTransaction" },
          },
          header: { method: "DELETE" },
          auth: { includeCookies: true },
          payload: transactionDeleteData,
        })
        .sendRequest<ServerResponseParams<null>, Transaction.Hook.DeleteProps>();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactionQuery"] }),
  });
  return deleteTransaction;
};

export default useTransactionDeleteMutation;
