import { useMutation, useQueryClient } from "@tanstack/react-query";

import { controllers, methods, Requester, routes } from "@/shared/utils/requester";

const useAccountUpdateMutation = () => {
  const queryClient = useQueryClient();

  const accountUpdate = useMutation({
    mutationKey: ["updateAccountMutation"],
    mutationFn: async (accountUpdateData: AccountUpdateRequestProps) => {
      const { accessToken, ...requestData } = accountUpdateData;
      const response = await new Requester({
        method: methods.patch,
        endpoint: {
          route: routes.account,
          controller: controllers.update,
        },
        accessToken: accessToken,
        payload: requestData,
      }).send();

      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accountQuery"] }),
  });

  return accountUpdate;
};

export default useAccountUpdateMutation;
