import AccountHooksTypes from "@/types/account";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EasyRequester } from "easy-requester";

const useAccountCreateMutation = () => {
  const queryClient = useQueryClient();

  const accountCreate = useMutation({
    mutationKey: ["createAccountMutation"],
    mutationFn: async (accountCreateData: AccountHooksTypes.Mutations.CreateRequestParams) => {
      const { accessToken, ...requestData } = accountCreateData;
      const response = await new EasyRequester()
        .setConfig({
          method: "POST",
          endpoint: { route: "account", action: "create" },
          accessToken: accessToken,
          payload: requestData,
        })
        .sendRequest();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accountQuery"] }),
  });
  return accountCreate;
};

export default useAccountCreateMutation;
