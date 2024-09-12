import { useTranslation } from "react-i18next";

import { useQuery } from "@tanstack/react-query";

import { controllers, methods, Requester, routes } from "@/shared/utils/requester";

import { errorMessage } from "@/localization/i18n";

const useTransactionQuery = (transactionQueryData: TransactionQueryRequestProps) => {
  const { t } = useTranslation();

  const transaction = useQuery({
    queryKey: ["transactionQuery", transactionQueryData],
    queryFn: async () => {
      const { accessToken, ...requestData } = transactionQueryData;
      try {
        const response = await new Requester({
          method: methods.post,
          endpoint: {
            route: routes.transaction,
            controller: controllers.getDetailsAll,
          },
          accessToken: accessToken,
          payload: requestData,
        }).send<TransactionQueryResponseProps[]>();

        return response;
      } catch (error) {
        if (error instanceof Error) {
          console.error(errorMessage(useTransactionQuery.name, error));
          throw error;
        } else {
          console.error(errorMessage(useTransactionQuery.name, error));
          throw new Error(t("hookMessages.error"));
        }
      }
    },
  });

  return transaction;
};

export default useTransactionQuery;
