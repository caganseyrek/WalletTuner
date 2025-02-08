import { useMutation } from "@tanstack/react-query";

import { EasyRequester } from "@/lib/EasyRequester/src";

import UserTypes from "@/types/user";

const useRegisterMutation = () => {
  const register = useMutation({
    mutationKey: ["registerMutation"],
    mutationFn: async (registerData: UserTypes.Mutations.RegisterRequestParams) => {
      const response = await new EasyRequester()
        .setConfig({
          requestConfig: {
            method: "POST",
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "user", action: "auth/register" },
            payload: registerData,
          },
        })
        .sendRequest();
      return response;
    },
  });
  return register;
};

export default useRegisterMutation;
