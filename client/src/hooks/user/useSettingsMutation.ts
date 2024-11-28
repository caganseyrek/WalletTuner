import GlobalTypes from "@/types/globals";
import UserTypes from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Requester from "@/utils/requester";

const useSettingsMutation = () => {
  const queryClient = useQueryClient();

  const settings = useMutation({
    mutationKey: ["settingsMutation"],
    mutationFn: async (settingsData: UserTypes.Settings.SettingsRequestProps) => {
      const { accessToken, ...requestPayload } = settingsData;
      const response = await new Requester({
        method: "POST",
        endpoint: { route: "user", action: "settings" },
        accessToken: accessToken,
        payload: requestPayload,
      }).sendRequest<UserTypes.Settings.SettingsResponseProps>();

      return response;
    },
    onSuccess: (
      settingsData: GlobalTypes.BackendResponseParams<UserTypes.Settings.SettingsResponseProps>,
    ) => {
      queryClient.setQueryData(["userSettings"], settingsData.data);
    },
  });

  return settings;
};

export default useSettingsMutation;
