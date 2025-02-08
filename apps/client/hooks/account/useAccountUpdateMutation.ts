import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Account } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";

const useAccountUpdateMutation = () => {
  const queryClient = useQueryClient();

  const accountUpdate = useMutation({
    mutationKey: ["updateAccountMutation"],
    mutationFn: async (accountUpdateData: Account.Hook.UpdateProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "account", action: "updateAcount" },
          },
          header: { method: "PATCH" },
          auth: { includeCookies: true },
          payload: accountUpdateData,
        })
        .sendRequest<void, Account.Hook.UpdateProps>();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accountQuery"] }),
  });
  return accountUpdate;
};

export default useAccountUpdateMutation;
