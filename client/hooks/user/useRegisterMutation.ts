import UserTypes from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { EasyRequester } from "easy-requester";

const useRegisterMutation = () => {
  const register = useMutation({
    mutationKey: ["registerMutation"],
    mutationFn: async (registerData: UserTypes.Mutations.RegisterRequestParams) => {
      const response = await new EasyRequester()
        .setConfig({
          method: "POST",
          endpoint: { route: "user", action: "register" },
          payload: registerData,
        })
        .sendRequest();
      return response;
    },
  });
  return register;
};

export default useRegisterMutation;
