import { useMutation, useQueryClient } from "@tanstack/react-query";

import { controllers, methods, Requester, routes } from "@/utils/requester";

const useAccountCreateMutation = () => {
  const queryClient = useQueryClient();

  const accountCreate = useMutation({
    mutationKey: ["createAccountMutation"],
    mutationFn: async (accountCreateData: AccountCreateRequestProps) => {
      const { accessToken, ...requestData } = accountCreateData;
      const response = await new Requester({
        method: methods.post,
        endpoint: {
          route: routes.account,
          controller: controllers.create,
        },
        accessToken: accessToken,
        payload: requestData,
      }).send();

      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accountQuery"] }),
  });

  return accountCreate;
};

export default useAccountCreateMutation;
