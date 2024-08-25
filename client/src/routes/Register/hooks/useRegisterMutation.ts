import { useMutation } from "@tanstack/react-query";
import i18next from "i18next";

import { controllers, methods, Requester, routes } from "@/utils/requester";

import { errorMessage } from "@/localization/i18n";

export const useRegisterMutation = () => {
  const register = useMutation({
    mutationKey: ["registerMutation"],
    mutationFn: async (registerData: RegisterRequestProps) => {
      try {
        const response = await new Requester({
          method: methods.post,
          endpoint: {
            route: routes.user,
            controller: controllers.register,
          },
          payload: registerData,
        }).send<RegisterResponseProps>();

        return response;
      } catch (error) {
        if (error instanceof Error) {
          console.error(errorMessage(useRegisterMutation.name, error));
          throw error;
        } else {
          console.error(errorMessage(useRegisterMutation.name, error));
          throw new Error(i18next.t("hookMessages.error"));
        }
      }
    },
  });

  return register;
};
