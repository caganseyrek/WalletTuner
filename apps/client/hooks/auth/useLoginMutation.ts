import { useMutation } from "@tanstack/react-query";
import { Auth } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/shared/types/globals";

const useLoginMutation = () => {
  const login = useMutation({
    mutationKey: ["loginMutation"],
    mutationFn: async (loginData: Auth.Hook.LoginProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "auth", action: "login" },
          },
          auth: {},
          header: { method: "POST" },
          payload: loginData,
        })
        .sendRequest<ServerResponseParams<null>, Auth.Hook.LoginProps>();
      return response;
    },
  });
  return login;
};

export default useLoginMutation;
