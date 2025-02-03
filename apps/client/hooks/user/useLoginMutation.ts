import { useMutation } from "@tanstack/react-query";

import { EasyRequester } from "@/lib/EasyRequester/src";

import GlobalTypes from "@/types/globals";
import UserTypes from "@/types/user";

const useLoginMutation = () => {
  const login = useMutation({
    mutationKey: ["loginMutation"],
    mutationFn: async (loginData: UserTypes.Mutations.LoginRequestParams) => {
      const response = await new EasyRequester()
        .setConfig({
          requestConfig: {
            method: "POST",
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: "user/auth/login",
            payload: loginData,
          },
        })
        .sendRequest<GlobalTypes.BackendResponseParams<UserTypes.Mutations.LoginResponseParams>>();
      return response;
    },
  });
  return login;
};

export default useLoginMutation;
