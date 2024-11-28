import UserTypes from "@/types/user";
import { useMutation } from "@tanstack/react-query";

import Requester from "@/utils/requester";

const useRegisterMutation = () => {
  const register = useMutation({
    mutationKey: ["registerMutation"],
    mutationFn: async (registerData: UserTypes.Mutations.RegisterRequestParams) => {
      const response = await new Requester({
        method: "POST",
        endpoint: { route: "user", action: "register" },
        payload: registerData,
      }).sendRequest();

      return response;
    },
  });

  return register;
};

export default useRegisterMutation;
