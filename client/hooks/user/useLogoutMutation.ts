import GlobalTypes from "@/types/globals";
import UserTypes from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EasyRequester } from "easy-requester";

const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  const logout = useMutation({
    mutationKey: ["logoutMutation"],
    mutationFn: async (logoutData: UserTypes.Mutations.LogoutRequestParams) => {
      const { accessToken, ...requestData } = logoutData;
      const response = await new EasyRequester()
        .setConfig({
          method: "POST",
          endpoint: { route: "user", action: "logout" },
          payload: requestData,
          includeCookies: true,
        })
        .sendRequest();
      return response;
    },
    onSuccess: () => {
      queryClient.resetQueries();
      const emptyAuthDetails: GlobalTypes.AuthDetailsParams = {
        accessToken: undefined,
        currentUser: undefined,
        currentEmail: undefined,
        name: undefined,
      };
      queryClient.setQueryData<GlobalTypes.AuthDetailsParams>(["authDetails"], emptyAuthDetails);
    },
  });
  return logout;
};

export default useLogoutMutation;
