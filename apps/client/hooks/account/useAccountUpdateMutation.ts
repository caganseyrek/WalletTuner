import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Account } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/types/globals";

const useAccountUpdateMutation = () => {
  const queryClient = useQueryClient();

  const updateAccount = useMutation({
    mutationKey: ["updateAccountMutation"],
    mutationFn: async (accountUpdateData: Account.Hook.UpdateProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
            endpoint: { route: "account", action: "updateAccount" },
          },
          method: "PATCH",
          auth: { includeCookies: true },
        })
        .sendRequest<ServerResponseParams<void>, Account.Hook.UpdateProps>(accountUpdateData);
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accountQuery"] }),
  });
  return updateAccount;
};

export default useAccountUpdateMutation;
