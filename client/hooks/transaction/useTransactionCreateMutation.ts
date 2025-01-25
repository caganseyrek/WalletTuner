import TransactionTypes from "@/types/transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EasyRequester } from "easy-requester";

const useTransactionCreateMutation = () => {
  const queryClient = useQueryClient();

  const createTransaction = useMutation({
    mutationKey: ["createTransactionMutation"],
    mutationFn: async (transactionCreateData: TransactionTypes.Mutations.CreateRequestParams) => {
      const { accessToken, ...requestData } = transactionCreateData;
      const response = await new EasyRequester()
        .setConfig({
          method: "POST",
          endpoint: { route: "transaction", action: "create" },
          accessToken: accessToken,
          payload: requestData,
        })
        .sendRequest();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactionQuery"] }),
  });
  return createTransaction;
};

export default useTransactionCreateMutation;
