import TransactionTypes from "@/types/transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Requester from "@/utils/requester";

const useTransactionDeleteMutation = () => {
  const queryClient = useQueryClient();

  const deleteTransaction = useMutation({
    mutationKey: ["deleteTransactionMutation"],
    mutationFn: async (transactionDeleteData: TransactionTypes.Mutations.DeleteRequestParams) => {
      const { accessToken, ...requestData } = transactionDeleteData;
      const response = await new Requester({
        method: "DELETE",
        endpoint: { route: "transaction", action: "delete" },
        accessToken: accessToken,
        payload: requestData,
      }).sendRequest();

      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactionQuery"] }),
  });

  return deleteTransaction;
};

export default useTransactionDeleteMutation;
