import { useTranslation } from "react-i18next";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { controllers, methods, Requester, routes } from "@/utils/requester";

import { errorMessage } from "@/localization/i18n";

const useAccountCreateMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const accountCreate = useMutation({
    mutationKey: ["createAccountMutation"],
    mutationFn: async (accountCreateData: AccountCreateRequestProps) => {
      const { accessToken, ...requestData } = accountCreateData;
      try {
        const response = await new Requester({
          method: methods.post,
          endpoint: {
            route: routes.account,
            controller: controllers.create,
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
          throw new Error(t("hookMessages.error"));
        }
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accountQuery"] }),
  });

  return accountCreate;
};

export default useAccountCreateMutation;
