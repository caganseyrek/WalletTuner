import { useMutation } from "@tanstack/react-query";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/shared/types/globals";

const useDeleteUserMutation = () => {
  const deleteUser = useMutation({
    mutationKey: ["deleteUserMutation"],
    mutationFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "auth", subroute: "user", action: "deleteUser" },
          },
          header: { method: "DELETE" },
          auth: { includeCookies: true },
        })
        .sendRequest<ServerResponseParams<null>, null>();
      return response;
    },
  });
  return deleteUser;
};

export default useDeleteUserMutation;
