import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Account } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/shared/types/globals";

const useAccountUpdateMutation = () => {
  const queryClient = useQueryClient();

  const updateAccount = useMutation({
    mutationKey: ["updateAccountMutation"],
    mutationFn: async (accountUpdateData: Account.Hook.UpdateProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "account", action: "updateAccount" },
          },
          header: { method: "PATCH" },
          auth: { includeCookies: true },
          payload: accountUpdateData,
        })
        .sendRequest<ServerResponseParams<void>, Account.Hook.UpdateProps>();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accountQuery"] }),
  });
  return updateAccount;
};

export default useAccountUpdateMutation;
