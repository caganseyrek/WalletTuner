import { useMutation, useQueryClient } from "@tanstack/react-query";

import { EasyRequester } from "@/lib/EasyRequester/src";

import GlobalTypes from "@/shared/types/globals";

import UserTypes from "@/types/user";

const useSettingsMutation = () => {
  const queryClient = useQueryClient();

  const settings = useMutation({
    mutationKey: ["settingsMutation"],
    mutationFn: async () => {
      const response = await new EasyRequester()
        .setConfig({
          requestConfig: {
            method: "POST",
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "user", action: "settings" },
            includeCookies: true,
          },
        })
        .sendRequest<GlobalTypes.BackendResponseParams<UserTypes.Settings.SettingsResponseProps>>();
      return response;
    },
    onSuccess: (settingsData: GlobalTypes.BackendResponseParams<UserTypes.Settings.SettingsResponseProps>) => {
      queryClient.setQueryData(["userSettings"], settingsData.data);
    },
  });
  return settings;
};

export default useSettingsMutation;
