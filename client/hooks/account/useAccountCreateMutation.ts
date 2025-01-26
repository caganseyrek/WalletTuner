import { useMutation, useQueryClient } from "@tanstack/react-query";

import { EasyRequester } from "@/lib/EasyRequester/src";

import AccountHooksTypes from "@/types/account";

const useAccountCreateMutation = () => {
  const queryClient = useQueryClient();

  const accountCreate = useMutation({
    mutationKey: ["createAccountMutation"],
    mutationFn: async (accountCreateData: AccountHooksTypes.Mutations.CreateRequestParams) => {
      const response = await new EasyRequester()
        .setConfig({
          requestConfig: {
            method: "POST",
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "account", action: "createAccount" },
            payload: accountCreateData,
            includeCookies: true,
          },
        })
        .sendRequest();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accountQuery"] }),
  });
  return accountCreate;
};

export default useAccountCreateMutation;
