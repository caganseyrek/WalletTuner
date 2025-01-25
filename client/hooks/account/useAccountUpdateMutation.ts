import AccountHooksTypes from "@/types/account";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Requester from "@/shared/utils/requester";

const useAccountUpdateMutation = () => {
  const queryClient = useQueryClient();

  const accountUpdate = useMutation({
    mutationKey: ["updateAccountMutation"],
    mutationFn: async (accountUpdateData: AccountHooksTypes.Mutations.UpdateRequestParams) => {
      const { accessToken, ...requestData } = accountUpdateData;
      const response = await new Requester({
        method: "PATCH",
        endpoint: { route: "account", action: "update" },
        accessToken: accessToken,
        payload: requestData,
      }).sendRequest();

      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accountQuery"] }),
  });

  return accountUpdate;
};

export default useAccountUpdateMutation;
