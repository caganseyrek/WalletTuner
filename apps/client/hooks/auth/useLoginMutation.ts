import { useMutation } from "@tanstack/react-query";
import { Auth } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";

import { ServerResponseParams } from "@/types/globals";

const useLoginMutation = () => {
  const login = useMutation({
    mutationKey: ["loginMutation"],
    mutationFn: async (loginData: Auth.Hook.LoginProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
            endpoint: { route: "auth", action: "login" },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<ServerResponseParams<null>, Auth.Hook.LoginProps>(loginData);
      return response;
    },
  });
  return login;
};

export default useLoginMutation;
