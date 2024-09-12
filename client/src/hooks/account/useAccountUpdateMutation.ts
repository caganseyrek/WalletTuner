import { useTranslation } from "react-i18next";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { controllers, methods, Requester, routes } from "@/shared/utils/requester";

import { errorMessage } from "@/localization/i18n";

const useAccountUpdateMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const accountUpdate = useMutation({
    mutationKey: ["updateAccountMutation"],
    mutationFn: async (accountUpdateData: AccountUpdateRequestProps) => {
      const { accessToken, ...requestData } = accountUpdateData;
      try {
        const response = await new Requester({
          method: methods.patch,
          endpoint: {
            route: routes.account,
            controller: controllers.update,
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
          throw new Error(t("hookMessages.error"));
        }
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accountQuery"] }),
  });

  return accountUpdate;
};

export default useAccountUpdateMutation;
