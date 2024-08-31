import { useTranslation } from "react-i18next";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { controllers, methods, Requester, routes } from "@/utils/requester";

import { errorMessage } from "@/localization/i18n";

const useTransactionUpdateMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const updateTransaction = useMutation({
    mutationKey: ["updateTransactionMutation"],
    mutationFn: async (transactionUpdateData: TransactionUpdateRequestProps) => {
      const { accessToken, ...requestData } = transactionUpdateData;
      try {
        const response = await new Requester({
          method: methods.patch,
          endpoint: {
            route: routes.transaction,
            controller: controllers.update,
          },
          accessToken: accessToken,
          payload: requestData,
        }).send<MessageResponseProps>();

        return response;
      } catch (error) {
        if (error instanceof Error) {
          console.error(errorMessage(useTransactionUpdateMutation.name, error));
          throw error;
        } else {
          console.error(errorMessage(useTransactionUpdateMutation.name, error));
          throw new Error(t("hookMessages.error"));
        }
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactionQuery"] }),
  });

  return updateTransaction;
};

export default useTransactionUpdateMutation;
