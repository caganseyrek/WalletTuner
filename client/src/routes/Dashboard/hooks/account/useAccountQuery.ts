import { useQuery } from "@tanstack/react-query";

import { controllers, methods, Requester, routes } from "@/utils/requester";

const useAccountQuery = (accountQueryData: AccountQueryRequestProps) => {
  const account = useQuery({
    queryKey: ["accountQuery", accountQueryData],
    queryFn: async () => {
      const { accessToken, ...requestData } = accountQueryData;
      const response = await new Requester({
        method: methods.post,
        endpoint: {
          route: routes.account,
          controller: controllers.accountDetailsAll,
        },
        accessToken: accessToken,
        payload: requestData,
      }).send<AccountQueryResponseProps[]>();

      return response;
    },
  });

  return account;
};

export default useAccountQuery;
