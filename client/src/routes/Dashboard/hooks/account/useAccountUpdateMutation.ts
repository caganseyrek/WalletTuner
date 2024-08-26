import { useMutation, useQueryClient } from "@tanstack/react-query";
import i18next from "i18next";

import { controllers, methods, Requester, routes } from "@/utils/requester";

import { errorMessage } from "@/localization/i18n";

const useAccountUpdateMutation = () => {
  const queryClient = useQueryClient();

  const accountUpdate = useMutation({
    mutationKey: ["accountMutation"],
    mutationFn: async (accountUpdateData: AccountUpdateRequestProps) => {
      const { accessToken, ...requestData } = accountUpdateData;
      try {
        const response = await new Requester({
          method: methods.patch,
          endpoint: {
            route: routes.account,
            controller: controllers.updateAccount,
          },
          accessToken: accessToken,
          payload: requestData,
        }).send<MessageResponseProps>();

        return response;
      } catch (error) {
        if (error instanceof Error) {
          console.error(errorMessage(useAccountUpdateMutation.name, error));
          throw error;
        } else {
          console.error(errorMessage(useAccountUpdateMutation.name, error));
          throw new Error(i18next.t("hookMessages.error"));
        }
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accountQuery"] }),
  });

  return accountUpdate;
};

export default useAccountUpdateMutation;
