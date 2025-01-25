import AccountHooksTypes from "@/types/account";
import GlobalTypes from "@/types/globals";
import { useQuery } from "@tanstack/react-query";
import { EasyRequester } from "easy-requester";

const useAccountQuery = (accountQueryData: AccountHooksTypes.Queries.RequestParams) => {
  const account = useQuery({
    queryKey: ["accountQuery", accountQueryData],
    queryFn: async () => {
      const { accessToken, ...requestData } = accountQueryData;
      const response = await new EasyRequester()
        .setConfig({
          method: "POST",
          endpoint: { route: "account", action: "all" },
          accessToken: accessToken,
          payload: requestData,
        })
        .sendRequest<GlobalTypes.BackendResponseParams<AccountHooksTypes.Queries.ResponseProps[]>>();
      return response;
    },
  });
  return account;
};

export default useAccountQuery;
