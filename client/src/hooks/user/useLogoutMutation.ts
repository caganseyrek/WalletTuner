import { useMutation, useQueryClient } from "@tanstack/react-query";

import { controllers, methods, Requester, routes } from "@/shared/utils/requester";

const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  const logout = useMutation({
    mutationKey: ["logoutMutation"],
    mutationFn: async (logoutData: LogoutRequestProps) => {
      const { accessToken, ...requestData } = logoutData;
      const response = await new Requester({
        method: methods.post,
        endpoint: {
          route: routes.user,
          controller: controllers.logout,
        },
        headers: { withCredentials: true },
        accessToken: accessToken,
        payload: requestData,
      }).send();

      return response;
    },
    onSuccess: () => {
      queryClient.resetQueries();

      const emptyAuthDetails: AuthDetailsProps = {
        accessToken: undefined,
        currentUser: undefined,
        currentEmail: undefined,
        name: undefined,
      };
      queryClient.setQueryData<AuthDetailsProps>(["authDetails"], emptyAuthDetails);
    },
  });

  return logout;
};

export default useLogoutMutation;
