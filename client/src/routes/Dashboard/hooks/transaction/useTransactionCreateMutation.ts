import { useTranslation } from "react-i18next";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { controllers, methods, Requester, routes } from "@/utils/requester";

import { errorMessage } from "@/localization/i18n";

const useTransactionCreateMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const createTransaction = useMutation({
    mutationKey: ["createTransactionMutation"],
    mutationFn: async (transactionCreateData: TransactionCreateRequestProps) => {
      const { accessToken, ...requestData } = transactionCreateData;
      try {
        const response = await new Requester({
          method: methods.post,
          endpoint: {
            route: routes.transaction,
            controller: controllers.create,
          },
          accessToken: accessToken,
          payload: requestData,
        }).send<MessageResponseProps>();

        return response;
      } catch (error) {
        if (error instanceof Error) {
          console.error(errorMessage(useTransactionCreateMutation.name, error));
          throw error;
        } else {
          console.error(errorMessage(useTransactionCreateMutation.name, error));
          throw new Error(t("hookMessages.error"));
        }
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactionQuery"] }),
  });

  return createTransaction;
};

export default useTransactionCreateMutation;
