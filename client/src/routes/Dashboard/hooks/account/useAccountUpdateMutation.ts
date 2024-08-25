import { useMutation } from "@tanstack/react-query";
import i18next from "i18next";

import { controllers, methods, Requester, routes } from "@/utils/requester";

import { errorMessage } from "@/localization/i18n";

import { useLogoutMutation } from "../useLogoutMutation";

export const useAccountUpdateMutation = () => {
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
          console.error(errorMessage(useLogoutMutation.name, error));
          throw error;
        } else {
          console.error(errorMessage(useLogoutMutation.name, error));
          throw new Error(i18next.t("hookMessages.error"));
        }
      }
    },
  });

  return accountUpdate;
};
