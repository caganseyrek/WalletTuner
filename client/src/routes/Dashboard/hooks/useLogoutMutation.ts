import { useMutation, useQueryClient } from "@tanstack/react-query";
import i18next from "i18next";

import { Requester, methods, routes, controllers } from "@/utils/requester";

import { errorMessage } from "@/localization/i18n";

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  const logout = useMutation({
    mutationKey: ["logoutMutation"],
    mutationFn: async (logoutData: LogoutRequestProps) => {
      const { accessToken, ...requestData } = logoutData;
      try {
        const response = await new Requester({
          method: methods.post,
          endpoint: {
            route: routes.user,
            controller: controllers.logout,
          },
          headers: { withCredentials: true },
          accessToken: accessToken,
          payload: requestData,
        }).send<MessageResponseProps>();

        return response;
      } catch (error) {
        if (error instanceof Error) {
          console.error(errorMessage(useLogoutMutation.name, error));
          throw error;
        } else {
          console.error(errorMessage(useLogoutMutation.name, error));
          throw new Error(i18next.t("hookMessages.error"));
        }
      }
    },
    onSuccess: () => queryClient.resetQueries(),
  });

  return logout;
};
