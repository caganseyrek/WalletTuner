import TransactionTypes from "@/types/transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EasyRequester } from "easy-requester";

const useTransactionDeleteMutation = () => {
  const queryClient = useQueryClient();

  const deleteTransaction = useMutation({
    mutationKey: ["deleteTransactionMutation"],
    mutationFn: async (transactionDeleteData: TransactionTypes.Mutations.DeleteRequestParams) => {
      const { accessToken, ...requestData } = transactionDeleteData;
      const response = await new EasyRequester()
        .setConfig({
          method: "DELETE",
          endpoint: { route: "transaction", action: "delete" },
          accessToken: accessToken,
          payload: requestData,
        })
        .sendRequest();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactionQuery"] }),
  });
  return deleteTransaction;
};

export default useTransactionDeleteMutation;
