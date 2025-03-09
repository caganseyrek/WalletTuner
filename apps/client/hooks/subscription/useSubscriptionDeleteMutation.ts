import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Subscription } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/types/globals";

const useSubscriptionDeleteMutation = () => {
  const queryClient = useQueryClient();

  const deleteSubscription = useMutation({
    mutationKey: ["deleteSubscriptionMutation"],
    mutationFn: async (subscriptionDeleteData: Subscription.Hook.DeleteProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
            endpoint: { route: "subscription", action: "deleteSubscription" },
          },
          method: "DELETE",
          auth: { includeCookies: true },
        })
        .sendRequest<ServerResponseParams<void>, Subscription.Hook.DeleteProps>(subscriptionDeleteData);
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subscriptionQuery"] }),
  });
  return deleteSubscription;
};

export default useSubscriptionDeleteMutation;
