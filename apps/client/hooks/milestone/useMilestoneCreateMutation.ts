import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Milestone } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/shared/types/globals";

const useMilestoneCreateMutation = () => {
  const queryClient = useQueryClient();

  const createMilestone = useMutation({
    mutationKey: ["createMilestoneMutation"],
    mutationFn: async (milestoneCreateData: Milestone.Hook.CreateProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "milestone", action: "createMilestone" },
          },
          header: { method: "POST" },
          auth: { includeCookies: true },
          payload: milestoneCreateData,
        })
        .sendRequest<ServerResponseParams<void>, Milestone.Hook.CreateProps>();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["milestoneQuery"] }),
  });
  return createMilestone;
};

export default useMilestoneCreateMutation;
