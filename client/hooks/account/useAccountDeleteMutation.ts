import AccountHooksTypes from "@/types/account";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EasyRequester } from "easy-requester";

const useAccountDeleteMutation = () => {
  const queryClient = useQueryClient();

  const accountDelete = useMutation({
    mutationKey: ["deleteAccountMutation"],
    mutationFn: async (accountDeleteData: AccountHooksTypes.Mutations.DeleteRequestParams) => {
      const { accessToken, ...requestData } = accountDeleteData;
      const response = await new EasyRequester()
        .setConfig({
          method: "DELETE",
          endpoint: { route: "account", action: "delete" },
          accessToken: accessToken,
          payload: requestData,
        })
        .sendRequest();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accountQuery"] }),
  });
  return accountDelete;
};

export default useAccountDeleteMutation;
