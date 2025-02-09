import { useMutation } from "@tanstack/react-query";
import { Auth } from "@wallettuner/resource-types";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/shared/types/globals";

const useUpdateUserMutation = () => {
  const updateUser = useMutation({
    mutationKey: ["updateUserMutation"],
    mutationFn: async (updateUserProps: Auth.Hook.UpdateUserProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "auth", subroute: "user", action: "updateUser" },
          },
          header: { method: "POST" },
          auth: { includeCookies: true },
          payload: updateUserProps,
        })
        .sendRequest<ServerResponseParams<Auth.Hook.UpdateUserProps>, null>();
      return response;
    },
  });
  return updateUser;
};

export default useUpdateUserMutation;
