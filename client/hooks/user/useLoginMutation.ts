import GlobalTypes from "@/types/globals";
import UserTypes from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { EasyRequester, EasyRequesterConfig } from "easy-requester";

const useLoginMutation = () => {
  const login = useMutation({
    mutationKey: ["loginMutation"],
    mutationFn: async (loginData: UserTypes.Mutations.LoginRequestParams) => {
      const response = await new EasyRequester()
        .setConfig({
          method: "POST",
          endpoint: { route: "user", action: "login" },
          payload: loginData,
        })
        .sendRequest<GlobalTypes.BackendResponseParams<UserTypes.Mutations.LoginResponseParams>>();
      return response;
    },
  });
  return login;
};

export default useLoginMutation;
