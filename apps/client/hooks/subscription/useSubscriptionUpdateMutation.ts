import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Subscription } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/types/globals";

const useSubscriptionUpdateMutation = () => {
  const queryClient = useQueryClient();

  const subscriptionUpdate = useMutation({
    mutationKey: ["updateSubscriptionMutation"],
    mutationFn: async (subscriptionUpdateData: Subscription.Hook.UpdateProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
            endpoint: { route: "subscription", action: "updateSubscription" },
          },
          method: "PATCH",
          auth: { includeCookies: true },
        })
        .sendRequest<ServerResponseParams<void>, Subscription.Hook.UpdateProps>(subscriptionUpdateData);
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subscriptionQuery"] }),
  });
  return subscriptionUpdate;
};

export default useSubscriptionUpdateMutation;
