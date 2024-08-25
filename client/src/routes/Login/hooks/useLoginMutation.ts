import { useMutation, useQueryClient } from "@tanstack/react-query";
import i18next from "i18next";

import { controllers, methods, Requester, routes } from "@/utils/requester";

import { errorMessage } from "@/localization/i18n";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationKey: ["loginMutation"],
    mutationFn: async (loginData: LoginRequestProps) => {
      try {
        const response = await new Requester({
          method: methods.post,
          endpoint: {
            route: routes.user,
            controller: controllers.login,
          },
          payload: loginData,
        }).send<LoginResponseProps>();

        return response;
      } catch (error) {
        if (error instanceof Error) {
          console.error(errorMessage(useLoginMutation.name, error));
          throw error;
        } else {
          console.error(errorMessage(useLoginMutation.name, error));
          throw new Error(i18next.t("hookMessages.error"));
        }
      }
    },
    onSuccess: (loginData: LoginResponseProps) => {
      queryClient.setQueryData<AuthDetailsProps>(["authDetails"], loginData);
    },
  });

  return login;
};
