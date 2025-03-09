import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Account } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";

import { ServerResponseParams } from "@/types/globals";

const useAccountDeleteMutation = () => {
  const queryClient = useQueryClient();

  const deleteAccount = useMutation({
    mutationKey: ["deleteAccountMutation"],
    mutationFn: async (accountDeleteData: Account.Hook.DeleteProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
            endpoint: { route: "account", action: "deleteAccount" },
          },
          method: "DELETE",
          auth: { includeCookies: true },
        })
        .sendRequest<ServerResponseParams<void>, Account.Hook.DeleteProps>(accountDeleteData);
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accountQuery"] }),
  });
  return deleteAccount;
};

export default useAccountDeleteMutation;
