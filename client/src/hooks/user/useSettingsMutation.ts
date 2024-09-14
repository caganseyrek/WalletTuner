import { useMutation, useQueryClient } from "@tanstack/react-query";

import { controllers, methods, Requester, routes } from "@/shared/utils/requester";

const useSettingsMutation = () => {
  const queryClient = useQueryClient();

  const settings = useMutation({
    mutationKey: ["settingsMutation"],
    mutationFn: async (settingsData: SettingsRequestProps) => {
      const { accessToken, ...requestPayload } = settingsData;
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
    },
    onSuccess: (settingsData: BackendResponseProps<SettingsResponseProps>) => {
      queryClient.setQueryData(["userSettings"], settingsData.data);
    },
  });

  return settings;
};

export default useSettingsMutation;
