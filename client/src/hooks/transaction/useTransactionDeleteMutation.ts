import { useTranslation } from "react-i18next";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { controllers, methods, Requester, routes } from "@/shared/utils/requester";

import { errorMessage } from "@/localization/i18n";

const useTransactionDeleteMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const deleteTransaction = useMutation({
    mutationKey: ["deleteTransactionMutation"],
    mutationFn: async (transactionDeleteData: TransactionDeleteRequestProps) => {
      const { accessToken, ...requestData } = transactionDeleteData;
      try {
        const response = await new Requester({
          method: methods.delete,
          endpoint: {
            route: routes.transaction,
            controller: controllers.delete,
          },
          accessToken: accessToken,
          payload: requestData,
        }).send<MessageResponseProps>();

        return response;
      } catch (error) {
        if (error instanceof Error) {
          console.error(errorMessage(useTransactionDeleteMutation.name, error));
          throw error;
        } else {
          console.error(errorMessage(useTransactionDeleteMutation.name, error));
          throw new Error(t("hookMessages.error"));
        }
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactionQuery"] }),
  });

  return deleteTransaction;
};

export default useTransactionDeleteMutation;
