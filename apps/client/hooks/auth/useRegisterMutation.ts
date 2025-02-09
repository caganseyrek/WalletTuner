import { useMutation } from "@tanstack/react-query";
import { Auth } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/shared/types/globals";

const useRegisterMutation = () => {
  const register = useMutation({
    mutationKey: ["registerMutation"],
    mutationFn: async (registerData: Auth.Hook.RegisterProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "auth", action: "register" },
          },
          auth: {},
          header: { method: "POST" },
          payload: registerData,
        })
        .sendRequest<ServerResponseParams<null>, Auth.Hook.RegisterProps>();
      return response;
    },
  });
  return register;
};

export default useRegisterMutation;
