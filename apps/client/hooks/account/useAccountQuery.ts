import { useQuery } from "@tanstack/react-query";
import { Account } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/types/globals";

const useAccountQuery = () => {
  const accountQuery = useQuery({
    queryKey: ["accountQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
            endpoint: { route: "account", action: "getAccounts" },
          },
          method: "GET",
          auth: { includeCookies: true },
        })
        .sendRequest<ServerResponseParams<Account.AccountPropsWithString[]>, null>();
      return response;
    },
  });
  return accountQuery;
};

export default useAccountQuery;
