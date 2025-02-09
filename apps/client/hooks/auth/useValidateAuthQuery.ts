import { useQuery } from "@tanstack/react-query";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/shared/types/globals";

const useValidateAuthQuery = () => {
  const validateAuth = useQuery({
    queryKey: ["validateAuthQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "auth", action: "revalidate" },
          },
          header: { method: "GET" },
          auth: { includeCookies: true },
        })
        .sendRequest<ServerResponseParams<null>, null>();
      return response;
    },
  });
  return validateAuth;
};

export default useValidateAuthQuery;
