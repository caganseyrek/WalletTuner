import { useQuery } from "@tanstack/react-query";

import requester from "@/shared/lib/requester";

import { ServerResponseParams } from "@/types/globals";

const useUserDetailsQuery = () => {
  const userDetails = useQuery({
    queryKey: ["userDetailsQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
            endpoint: { route: "auth", subroute: "user", action: "getUserDetails" },
          },
          method: "GET",
          auth: { includeCookies: true },
        })
        .sendRequest<ServerResponseParams<null>, null>();
      return response;
    },
  });
  return userDetails;
};

export default useUserDetailsQuery;
