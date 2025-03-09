import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Milestone } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";

import { ServerResponseParams } from "@/types/globals";

const useMilestoneCreateMutation = () => {
  const queryClient = useQueryClient();

  const createMilestone = useMutation({
    mutationKey: ["createMilestoneMutation"],
    mutationFn: async (milestoneCreateData: Milestone.Hook.CreateProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
            endpoint: { route: "milestone", action: "createMilestone" },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<ServerResponseParams<void>, Milestone.Hook.CreateProps>(milestoneCreateData);
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["milestoneQuery"] }),
  });
  return createMilestone;
};

export default useMilestoneCreateMutation;
