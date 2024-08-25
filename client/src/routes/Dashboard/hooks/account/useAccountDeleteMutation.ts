import { useMutation, useQueryClient } from "@tanstack/react-query";
import i18next from "i18next";

import { controllers, methods, Requester, routes } from "@/utils/requester";

import { errorMessage } from "@/localization/i18n";

import { useLogoutMutation } from "../useLogoutMutation";

export const useAccountDeleteMutation = () => {
  const queryClient= useQueryClient();

  const accountDelete = useMutation({
    mutationKey: ["accountMutation"],
    mutationFn: async (accountDeleteData: AccountDeleteRequestProps) => {
      const { accessToken, ...requestData } = accountDeleteData;
      try {
        const response = await new Requester({
          method: methods.delete,
          endpoint: {
            route: routes.account,
            controller: controllers.deleteAccount,
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
    onSuccess: () => {
      queryClient.invalidateQueries("");
    }
  });

  return accountDelete;
};
