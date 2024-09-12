import { useTranslation } from "react-i18next";

import { useQuery } from "@tanstack/react-query";

import { controllers, methods, Requester, routes } from "@/shared/utils/requester";

import { errorMessage } from "@/localization/i18n";

const useAccountQuery = (accountQueryData: AccountQueryRequestProps) => {
  const { t } = useTranslation();

  const account = useQuery({
    queryKey: ["accountQuery", accountQueryData],
    queryFn: async () => {
      const { accessToken, ...requestData } = accountQueryData;
      try {
        const response = await new Requester({
          method: methods.post,
          endpoint: {
            route: routes.account,
            controller: controllers.getDetailsAll,
          },
          accessToken: accessToken,
          payload: requestData,
        }).send<AccountQueryResponseProps[]>();

        return response;
      } catch (error) {
        if (error instanceof Error) {
          console.error(errorMessage(useAccountQuery.name, error));
          throw error;
        } else {
          console.error(errorMessage(useAccountQuery.name, error));
          throw new Error(t("hookMessages.error"));
        }
      }
    },
  });

  return account;
};

export default useAccountQuery;
