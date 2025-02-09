import { useQuery } from "@tanstack/react-query";
import { Subscription } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/shared/types/globals";

const useSubscriptionQuery = () => {
  const subscriptionQuery = useQuery({
    queryKey: ["subscriptionQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
            endpoint: { route: "subscription", action: "getSubscriptions" },
          },
          header: { method: "GET" },
          auth: { includeCookies: true },
        })
        .sendRequest<ServerResponseParams<Subscription.SubscriptionPropsWithString[]>, null>();
      return response;
    },
  });
  return subscriptionQuery;
};

export default useSubscriptionQuery;
