import { useMutation } from "@tanstack/react-query";
import { Auth } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/types/globals";

const useRegisterMutation = () => {
  const register = useMutation({
    mutationKey: ["registerMutation"],
    mutationFn: async (registerData: Auth.Hook.RegisterProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
            endpoint: { route: "auth", action: "register" },
          },
          method: "POST",
        })
        .sendRequest<ServerResponseParams<null>, Auth.Hook.RegisterProps>(registerData);
      return response;
    },
  });
  return register;
};

export default useRegisterMutation;
