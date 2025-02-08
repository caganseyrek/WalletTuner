import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Account } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";

const useAccountDeleteMutation = () => {
  const queryClient = useQueryClient();

  const accountDelete = useMutation({
    mutationKey: ["deleteAccountMutation"],
    mutationFn: async (accountDeleteData: Account.Hook.DeleteProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "account", action: "deleteAccount" },
          },
          header: { method: "DELETE" },
          auth: { includeCookies: true },
          payload: accountDeleteData,
        })
        .sendRequest<void, Account.Hook.DeleteProps>();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accountQuery"] }),
  });
  return accountDelete;
};

export default useAccountDeleteMutation;
