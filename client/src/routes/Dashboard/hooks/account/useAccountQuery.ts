import { useQuery } from "@tanstack/react-query";

import { controllers, methods, Requester, routes } from "@/utils/requester";

const useAccountQuery = (accountQueryData: AccountQueryRequestProps) => {
  const account = useQuery({
    queryKey: ["accountQuery", accountQueryData],
    queryFn: async () => {
      const { accessToken, currentUser, accountId } = accountQueryData;
      const response = await new Requester({
        method: methods.get,
        endpoint: {
          route: routes.account,
          controller: controllers.accountDetails,
        },
        accessToken: accessToken,
        query: accountId,
        payload: { belongsToUser: currentUser },
      }).send<AccountQueryResponseProps[]>();

      return response;
    },
  });

  return account;
};

export default useAccountQuery;
