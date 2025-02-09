import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Subscription } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/shared/types/globals";

const useSubscriptionDeleteMutation = () => {
  const queryClient = useQueryClient();

  const deleteSubscription = useMutation({
    mutationKey: ["deleteSubscriptionMutation"],
    mutationFn: async (subscriptionDeleteData: Subscription.Hook.DeleteProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "subscription", action: "deleteSubscription" },
          },
          header: { method: "DELETE" },
          auth: { includeCookies: true },
          payload: subscriptionDeleteData,
        })
        .sendRequest<ServerResponseParams<void>, Subscription.Hook.DeleteProps>();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subscriptionQuery"] }),
  });
  return deleteSubscription;
};

export default useSubscriptionDeleteMutation;
