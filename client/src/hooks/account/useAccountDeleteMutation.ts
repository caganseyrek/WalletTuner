import { useMutation, useQueryClient } from "@tanstack/react-query";

import { controllers, methods, Requester, routes } from "@/utils/requester";

const useAccountDeleteMutation = () => {
  const queryClient = useQueryClient();

  const accountDelete = useMutation({
    mutationKey: ["deleteAccountMutation"],
    mutationFn: async (accountDeleteData: AccountDeleteRequestProps) => {
      const { accessToken, ...requestData } = accountDeleteData;
      const response = await new Requester({
        method: methods.delete,
        endpoint: {
          route: routes.account,
          controller: controllers.delete,
        },
        accessToken: accessToken,
        payload: requestData,
      }).send();

      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accountQuery"] }),
  });

  return accountDelete;
};

export default useAccountDeleteMutation;
