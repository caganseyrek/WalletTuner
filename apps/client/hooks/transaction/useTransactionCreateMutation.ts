import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";

import { ServerResponseParams } from "@/types/globals";

const useTransactionCreateMutation = () => {
  const queryClient = useQueryClient();

  const createTransaction = useMutation({
    mutationKey: ["createTransactionMutation"],
    mutationFn: async (transactionCreateData: Transaction.Hook.CreateProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
            endpoint: { route: "transaction", action: "createTransaction" },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<ServerResponseParams<null>, Transaction.Hook.CreateProps>(transactionCreateData);
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactionQuery"] }),
  });
  return createTransaction;
};

export default useTransactionCreateMutation;
