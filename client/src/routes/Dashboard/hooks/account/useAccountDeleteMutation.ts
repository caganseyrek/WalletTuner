import { useTranslation } from "react-i18next";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { controllers, methods, Requester, routes } from "@/utils/requester";

import { errorMessage } from "@/localization/i18n";

const useAccountDeleteMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const accountDelete = useMutation({
    mutationKey: ["deleteAccountMutation"],
    mutationFn: async (accountDeleteData: AccountDeleteRequestProps) => {
      const { accessToken, ...requestData } = accountDeleteData;
      try {
        const response = await new Requester({
          method: methods.delete,
          endpoint: {
            route: routes.account,
            controller: controllers.delete,
          },
          accessToken: accessToken,
          payload: requestData,
        }).send<MessageResponseProps>();

        return response;
      } catch (error) {
        if (error instanceof Error) {
          console.error(errorMessage(useAccountDeleteMutation.name, error));
          throw error;
        } else {
          console.error(errorMessage(useAccountDeleteMutation.name, error));
          throw new Error(t("hookMessages.error"));
        }
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accountQuery"] }),
  });

  return accountDelete;
};

export default useAccountDeleteMutation;
