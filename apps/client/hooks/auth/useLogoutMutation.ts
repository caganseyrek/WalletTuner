import { useMutation, useQueryClient } from "@tanstack/react-query";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/shared/types/globals";

const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  const logout = useMutation({
    mutationKey: ["logoutMutation"],
    mutationFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "auth", action: "logout" },
          },
          header: { method: "POST" },
          auth: { includeCookies: true },
        })
        .sendRequest<ServerResponseParams<null>, null>();
      return response;
    },
    onSuccess: () => queryClient.resetQueries(),
  });
  return logout;
};

export default useLogoutMutation;
