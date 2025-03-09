import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Subscription } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";

import { ServerResponseParams } from "@/types/globals";

const useSubscriptionCreateMutation = () => {
  const queryClient = useQueryClient();

  const createSubscription = useMutation({
    mutationKey: ["createSubscriptionMutation"],
    mutationFn: async (subscriptionCreateData: Subscription.Hook.CreateProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
            endpoint: { route: "subscription", action: "createSubscription" },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<ServerResponseParams<void>, Subscription.Hook.CreateProps>(subscriptionCreateData);
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subscriptionQuery"] }),
  });
  return createSubscription;
};

export default useSubscriptionCreateMutation;
