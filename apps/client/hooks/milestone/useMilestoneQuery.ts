import { useQuery } from "@tanstack/react-query";
import { Milestone } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";
import GlobalTypes from "@/shared/types/globals";

const useMilestoneQuery = () => {
  const milestoneQuery = useQuery({
    queryKey: ["milestoneQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
            endpoint: { route: "milestone", action: "getMilestones" },
          },
          header: { method: "GET" },
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<Milestone.MilestonePropsWithString[]>>();
      return response;
    },
  });
  return milestoneQuery;
};

export default useMilestoneQuery;
