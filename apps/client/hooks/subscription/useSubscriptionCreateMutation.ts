import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Subscription } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/shared/types/globals";

const useSubscriptionCreateMutation = () => {
  const queryClient = useQueryClient();

  const createSubscription = useMutation({
    mutationKey: ["createSubscriptionMutation"],
    mutationFn: async (subscriptionCreateData: Subscription.Hook.CreateProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "subscription", action: "createSubscription" },
          },
          header: { method: "POST" },
          auth: { includeCookies: true },
          payload: subscriptionCreateData,
        })
        .sendRequest<ServerResponseParams<void>, Subscription.Hook.CreateProps>();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subscriptionQuery"] }),
  });
  return createSubscription;
};

export default useSubscriptionCreateMutation;
