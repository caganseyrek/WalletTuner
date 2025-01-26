import { useMutation, useQueryClient } from "@tanstack/react-query";

import { EasyRequester } from "@/lib/EasyRequester/src";

import AccountHooksTypes from "@/types/account";

const useAccountDeleteMutation = () => {
  const queryClient = useQueryClient();

  const accountDelete = useMutation({
    mutationKey: ["deleteAccountMutation"],
    mutationFn: async (accountDeleteData: AccountHooksTypes.Mutations.DeleteRequestParams) => {
      const response = await new EasyRequester()
        .setConfig({
          requestConfig: {
            method: "DELETE",
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "account", action: "deleteAccount" },
            payload: accountDeleteData,
            includeCookies: true,
          },
        })
        .sendRequest();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accountQuery"] }),
  });
  return accountDelete;
};

export default useAccountDeleteMutation;
