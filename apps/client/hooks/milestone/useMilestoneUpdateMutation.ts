import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Milestone } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";

import { ServerResponseParams } from "@/types/globals";

const useMilestoneUpdateMutation = () => {
  const queryClient = useQueryClient();

  const milestoneUpdate = useMutation({
    mutationKey: ["updateMilestoneMutation"],
    mutationFn: async (milestoneUpdateData: Milestone.Hook.UpdateProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
            endpoint: { route: "milestone", action: "updateMilestone" },
          },
          method: "PATCH",
          auth: { includeCookies: true },
        })
        .sendRequest<ServerResponseParams<void>, Milestone.Hook.UpdateProps>(milestoneUpdateData);
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["milestoneQuery"] }),
  });
  return milestoneUpdate;
};

export default useMilestoneUpdateMutation;
