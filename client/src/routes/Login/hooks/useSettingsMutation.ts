import { useMutation, useQueryClient } from "@tanstack/react-query";
import i18next from "i18next";

import { controllers, methods, Requester, routes } from "@/utils/requester";

import { errorMessage } from "@/localization/i18n";

export const useSettingsMutation = () => {
  const queryClient = useQueryClient();

  const settings = useMutation({
    mutationKey: ["settingsMutation"],
    mutationFn: async (settingsData: SettingsRequestProps) => {
      const { accessToken, ...requestPayload } = settingsData;
      try {
        const response = await new Requester({
          method: methods.post,
          endpoint: {
            route: routes.user,
            controller: controllers.settings,
          },
          accessToken: accessToken,
          payload: requestPayload,
        }).send<SettingsResponseProps>();

        return response;
      } catch (error) {
        if (error instanceof Error) {
          console.error(errorMessage(useSettingsMutation.name, error));
          throw error;
        } else {
          console.error(errorMessage(useSettingsMutation.name, error));
          throw new Error(i18next.t("hookMessages.error"));
        }
      }
    },
    onSuccess: (settingsData: SettingsResponseProps) => {
      queryClient.setQueryData(["userSettings"], settingsData);
    },
  });

  return settings;
};
