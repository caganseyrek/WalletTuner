import { useMutation, useQueryClient } from "@tanstack/react-query";

import { EasyRequester } from "@/lib/EasyRequester/src";

import GlobalTypes from "@/shared/types/globals";

const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  const logout = useMutation({
    mutationKey: ["logoutMutation"],
    mutationFn: async () => {
      const response = await new EasyRequester()
        .setConfig({
          requestConfig: {
            method: "POST",
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "user", action: "auth/logout" },
            includeCookies: true,
          },
        })
        .sendRequest();
      return response;
    },
    onSuccess: () => {
      queryClient.resetQueries();
      const emptyAuthDetails: GlobalTypes.AuthDetailsParams = { email: undefined, name: undefined };
      queryClient.setQueryData<GlobalTypes.AuthDetailsParams>(["authDetails"], emptyAuthDetails);
    },
  });
  return logout;
};

export default useLogoutMutation;
