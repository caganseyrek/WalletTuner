import { useMutation } from "@tanstack/react-query";

import { controllers, methods, Requester, routes } from "@/shared/utils/requester";

const useRegisterMutation = () => {
  const register = useMutation({
    mutationKey: ["registerMutation"],
    mutationFn: async (registerData: RegisterRequestProps) => {
      const response = await new Requester({
        method: methods.post,
        endpoint: {
          route: routes.user,
          controller: controllers.register,
        },
        payload: registerData,
      }).send();

      return response;
    },
  });

  return register;
};

export default useRegisterMutation;
