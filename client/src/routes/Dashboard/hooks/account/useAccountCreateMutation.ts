import { useMutation, useQueryClient } from "@tanstack/react-query";
import i18next from "i18next";

import { controllers, methods, Requester, routes } from "@/utils/requester";

import { errorMessage } from "@/localization/i18n";

const useAccountCreateMutation = () => {
  const queryClient = useQueryClient();

  const accountCreate = useMutation({
    mutationKey: ["accountMutation"],
    mutationFn: async (accountCreateData: AccountCreateRequestProps) => {
      const { accessToken, ...requestData } = accountCreateData;
      try {
        const response = await new Requester({
          method: methods.post,
          endpoint: {
            route: routes.account,
            controller: controllers.createAccount,
          },
          accessToken: accessToken,
          payload: requestData,
        }).send<MessageResponseProps>();

        return response;
      } catch (error) {
        if (error instanceof Error) {
          console.error(errorMessage(useAccountCreateMutation.name, error));
          throw error;
        } else {
          console.error(errorMessage(useAccountCreateMutation.name, error));
          throw new Error(i18next.t("hookMessages.error"));
        }
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accountQuery"] }),
  });

  return accountCreate;
};

export default useAccountCreateMutation;
