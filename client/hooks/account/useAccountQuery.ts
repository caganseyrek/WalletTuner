import { useQuery } from "@tanstack/react-query";

import { AccountObject } from "@/components/columns/AccountColumns";

import { EasyRequester } from "@/lib/EasyRequester/src";

import AccountHooksTypes from "@/types/account";
import GlobalTypes from "@/types/globals";

const useAccountQuery = (accountQueryData: AccountHooksTypes.Queries.RequestParams) => {
  const account = useQuery({
    queryKey: ["accountQuery", accountQueryData],
    queryFn: async () => {
      const response = await new EasyRequester()
        .setConfig({
          requestConfig: {
            method: "GET",
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "account", action: "getAllAccounts" },
            includeCookies: true,
          },
        })
        .sendRequest<GlobalTypes.BackendResponseParams<AccountObject[]>>();
      return response;
    },
  });
  return account;
};

export default useAccountQuery;
