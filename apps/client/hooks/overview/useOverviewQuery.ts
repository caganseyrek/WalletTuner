import { useQuery } from "@tanstack/react-query";
import { Overview } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/shared/types/globals";

const useOverviewQuery = () => {
  const overviewQuery = useQuery({
    queryKey: ["overviewQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
            endpoint: { route: "overview", action: "getOverviews" },
          },
          header: { method: "GET" },
          auth: { includeCookies: true },
        })
        .sendRequest<ServerResponseParams<Overview.OverviewPropsWithString[]>, null>();
      return response;
    },
  });
  return overviewQuery;
};

export default useOverviewQuery;
