import { useQuery } from "@tanstack/react-query";

import { controllers, methods, Requester, routes } from "@/utils/requester";

const useAccountQuery = (accountQueryData: AccountQueryRequestProps) => {
  const account = useQuery({
    queryKey: ["accountQuery", accountQueryData],
    queryFn: async () => {
      const { accessToken, ...requestPayload } = accountQueryData;
      const response = await new Requester({
        method: methods.get,
        endpoint: {
          route: routes.account,
          controller: controllers.accountDetails,
        },
        accessToken: accessToken,
        query: requestPayload.accountId,
        payload: requestPayload,
      }).send<AccountQueryResponseProps[]>();

      return response;
    },
  });

  return account;
};

export default useAccountQuery;
