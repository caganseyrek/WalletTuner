import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Milestone } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/shared/types/globals";

const useMilestoneUpdateMutation = () => {
  const queryClient = useQueryClient();

  const milestoneUpdate = useMutation({
    mutationKey: ["updateMilestoneMutation"],
    mutationFn: async (milestoneUpdateData: Milestone.Hook.UpdateProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "milestone", action: "updateMilestone" },
          },
          header: { method: "PATCH" },
          auth: { includeCookies: true },
          payload: milestoneUpdateData,
        })
        .sendRequest<ServerResponseParams<void>, Milestone.Hook.UpdateProps>();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["milestoneQuery"] }),
  });
  return milestoneUpdate;
};

export default useMilestoneUpdateMutation;
