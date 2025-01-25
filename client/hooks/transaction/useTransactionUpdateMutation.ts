import TransactionTypes from "@/types/transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EasyRequester } from "easy-requester";

const useTransactionUpdateMutation = () => {
  const queryClient = useQueryClient();

  const updateTransaction = useMutation({
    mutationKey: ["updateTransactionMutation"],
    mutationFn: async (transactionUpdateData: TransactionTypes.Mutations.UpdateRequestParams) => {
      const { accessToken, ...requestData } = transactionUpdateData;
      const response = await new EasyRequester()
        .setConfig({
          method: "PATCH",
          endpoint: { route: "transaction", action: "update" },
          accessToken: accessToken,
          payload: requestData,
        })
        .sendRequest();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactionQuery"] }),
  });
  return updateTransaction;
};

export default useTransactionUpdateMutation;
