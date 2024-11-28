import AccountHooksTypes from "@/types/account";
import { useQuery } from "@tanstack/react-query";

import Requester from "@/utils/requester";

const useAccountQuery = (accountQueryData: AccountHooksTypes.Queries.RequestParams) => {
  const account = useQuery({
    queryKey: ["accountQuery", accountQueryData],
    queryFn: async () => {
      const { accessToken, ...requestData } = accountQueryData;
      const response = await new Requester({
        method: "POST",
        endpoint: { route: "account", action: "all" },
        accessToken: accessToken,
        payload: requestData,
      }).sendRequest<AccountHooksTypes.Queries.ResponseProps[]>();

      return response;
    },
  });

  return account;
};

export default useAccountQuery;
