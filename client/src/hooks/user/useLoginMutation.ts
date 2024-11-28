import GlobalTypes from "@/types/globals";
import UserTypes from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Requester from "@/utils/requester";

const useLoginMutation = () => {
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationKey: ["loginMutation"],
    mutationFn: async (loginData: UserTypes.Mutations.LoginRequestParams) => {
      const response = await new Requester({
        method: "POST",
        endpoint: { route: "user", action: "login" },
        payload: loginData,
      }).sendRequest<UserTypes.Mutations.LoginResponseParams>();

      return response;
    },
    onSuccess: (
      loginData: GlobalTypes.BackendResponseParams<UserTypes.Mutations.LoginResponseParams>,
    ) => {
      const authDetails: GlobalTypes.AuthDetailsParams = {
        accessToken: loginData.data?.accessToken,
        currentUser: loginData.data?.currentUser,
        currentEmail: loginData.data?.currentEmail,
        name: loginData.data?.name,
      };
      queryClient.setQueryData<GlobalTypes.AuthDetailsParams>(["authDetails"], authDetails);
    },
  });

  return login;
};

export default useLoginMutation;
