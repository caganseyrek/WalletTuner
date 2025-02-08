import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Account } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";

const useAccountCreateMutation = () => {
  const queryClient = useQueryClient();

  const accountCreate = useMutation({
    mutationKey: ["createAccountMutation"],
    mutationFn: async (accountCreateData: Account.Hook.CreateProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "accont", action: "createAccount" },
          },
          header: { method: "POST" },
          auth: { includeCookies: true },
          payload: accountCreateData,
        })
        .sendRequest<void, Account.Hook.CreateProps>();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accountQuery"] }),
  });
  return accountCreate;
};

export default useAccountCreateMutation;
