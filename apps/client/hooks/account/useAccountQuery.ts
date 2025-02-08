import { useQuery } from "@tanstack/react-query";
import { Account } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";
import GlobalTypes from "@/shared/types/globals";

const useAccountQuery = () => {
  const account = useQuery({
    queryKey: ["accountQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
            endpoint: { route: "account", action: "getAccounts" },
          },
          header: { method: "GET" },
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<Account.AccountPropsWithString[]>>();
      return response;
    },
  });
  return account;
};

export default useAccountQuery;
