import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Milestone } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";

import { ServerResponseParams } from "@/types/globals";

const useMilestoneDeleteMutation = () => {
  const queryClient = useQueryClient();

  const deleteMilestone = useMutation({
    mutationKey: ["deleteMilestoneMutation"],
    mutationFn: async (milestoneDeleteData: Milestone.Hook.DeleteProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
            endpoint: { route: "milestone", action: "deleteMilestone" },
          },
          method: "DELETE",
          auth: { includeCookies: true },
        })
        .sendRequest<ServerResponseParams<void>, Milestone.Hook.DeleteProps>(milestoneDeleteData);
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["milestoneQuery"] }),
  });
  return deleteMilestone;
};

export default useMilestoneDeleteMutation;
