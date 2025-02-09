import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Subscription } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/shared/types/globals";

const useSubscriptionUpdateMutation = () => {
  const queryClient = useQueryClient();

  const subscriptionUpdate = useMutation({
    mutationKey: ["updateSubscriptionMutation"],
    mutationFn: async (subscriptionUpdateData: Subscription.Hook.UpdateProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "subscription", action: "updateSubscription" },
          },
          header: { method: "PATCH" },
          auth: { includeCookies: true },
          payload: subscriptionUpdateData,
        })
        .sendRequest<ServerResponseParams<void>, Subscription.Hook.UpdateProps>();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subscriptionQuery"] }),
  });
  return subscriptionUpdate;
};

export default useSubscriptionUpdateMutation;
