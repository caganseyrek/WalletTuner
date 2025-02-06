import { useQuery } from "@tanstack/react-query";
import { EasyRequester } from "@wallettuner/easy-requester";

import { AccountProps } from "@/components/data_display/columns/AccountColumns";

import GlobalTypes from "@/shared/types/globals";

const useAccountQuery = () => {
  const account = useQuery({
    queryKey: ["accountQuery"],
    queryFn: async () => {
      const response = await new EasyRequester()
        .setConfig({
          requestConfig: {
            method: "GET",
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
            endpoint: { route: "account", action: "getAccounts" },
            includeCookies: true,
          },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<AccountProps[]>>();
      return response;
    },
  });
  return account;
};

export default useAccountQuery;
