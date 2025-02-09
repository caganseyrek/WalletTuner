import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Milestone } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/shared/types/globals";

const useMilestoneDeleteMutation = () => {
  const queryClient = useQueryClient();

  const deleteMilestone = useMutation({
    mutationKey: ["deleteMilestoneMutation"],
    mutationFn: async (milestoneDeleteData: Milestone.Hook.DeleteProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "milestone", action: "deleteMilestone" },
          },
          header: { method: "DELETE" },
          auth: { includeCookies: true },
          payload: milestoneDeleteData,
        })
        .sendRequest<ServerResponseParams<void>, Milestone.Hook.DeleteProps>();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["milestoneQuery"] }),
  });
  return deleteMilestone;
};

export default useMilestoneDeleteMutation;
