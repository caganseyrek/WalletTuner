import { useMutation } from "@tanstack/react-query";

import requester from "@/shared/lib/requester";
import { ServerResponseParams } from "@/types/globals";

const useDeleteUserMutation = () => {
  const deleteUser = useMutation({
    mutationKey: ["deleteUserMutation"],
    mutationFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
            endpoint: { route: "auth", subroute: "user", action: "deleteUser" },
          },
          method: "DELETE",
          auth: { includeCookies: true },
        })
        .sendRequest<ServerResponseParams<null>, null>();
      return response;
    },
  });
  return deleteUser;
};

export default useDeleteUserMutation;
