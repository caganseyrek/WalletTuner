import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/types/globals";

const useTransactionUpdateMutation = () => {
  const queryClient = useQueryClient();

  const updateTransaction = useMutation({
    mutationKey: ["updateTransactionMutation"],
    mutationFn: async (transactionUpdateData: Transaction.Hook.UpdateProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
            endpoint: { route: "transaction", action: "updateTransaction" },
          },
          method: "PATCH",
          auth: { includeCookies: true },
        })
        .sendRequest<ServerResponseParams<null>, Transaction.Hook.UpdateProps>(transactionUpdateData);
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactionQuery"] }),
  });
  return updateTransaction;
};

export default useTransactionUpdateMutation;
