import { useQuery } from "@tanstack/react-query";
import i18next from "i18next";

import useAuthDetails from "@/hooks/useAuthDetails";

import { controllers, methods, Requester, routes } from "@/utils/requester";

import { errorMessage } from "@/localization/i18n";

export const useRefreshQuery = () => {
  const { data: authDetails } = useAuthDetails();

  const refresh = useQuery({
    queryKey: ["refreshQuery"],
    queryFn: async () => {
      try {
        const response = await new Requester({
          method: methods.post,
          endpoint: {
            route: routes.user,
            controller: controllers.logout,
          },
          headers: { withCredentials: true },
          accessToken: authDetails!.accessToken!,
          payload: { currentUser: authDetails!.currentUser! },
        }).send();

        return response;
      } catch (error) {
        if (error instanceof Error) {
          console.error(errorMessage(useRefreshQuery.name, error));
          throw error;
        } else {
          console.error(errorMessage(useRefreshQuery.name, error));
          throw new Error(i18next.t("hookMessages.error"));
        }
      }
    },
    refetchInterval: 15 * 60 * 1000,
    staleTime: 15 * 60 * 1000,
  });

  return refresh;
};
