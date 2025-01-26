import { useMutation, useQueryClient } from "@tanstack/react-query";

import { EasyRequester } from "@/lib/EasyRequester/src";

import AccountHooksTypes from "@/types/account";

const useAccountUpdateMutation = () => {
  const queryClient = useQueryClient();

  const accountUpdate = useMutation({
    mutationKey: ["updateAccountMutation"],
    mutationFn: async (accountUpdateData: AccountHooksTypes.Mutations.UpdateRequestParams) => {
      const response = await new EasyRequester()
        .setConfig({
          requestConfig: {
            method: "PATCH",
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "account", action: "updateAcount" },
            payload: accountUpdateData,
            includeCookies: true,
          },
        })
        .sendRequest();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accountQuery"] }),
  });
  return accountUpdate;
};

export default useAccountUpdateMutation;
