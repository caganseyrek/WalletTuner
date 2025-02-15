import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/shared/types/globals";

const useTransactionQuery = () => {
  const transactions = useQuery({
    queryKey: ["transactionQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "transaction", action: "getAllTransactions" },
          },
          header: { method: "PATCH" },
          auth: { includeCookies: true },
        })
        .sendRequest<ServerResponseParams<Transaction.TransactionPropsWithString[]>, null>();
      return response;
    },
  });
  return transactions;
};

export default useTransactionQuery;
