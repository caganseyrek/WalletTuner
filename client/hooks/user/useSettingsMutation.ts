import GlobalTypes from "@/types/globals";
import UserTypes from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EasyRequester, EasyRequesterConfig } from "easy-requester";

const useSettingsMutation = () => {
  const queryClient = useQueryClient();

  const settings = useMutation({
    mutationKey: ["settingsMutation"],
    mutationFn: async () => {
      const response = await new EasyRequester()
        .setConfig({
          method: "POST",
          endpoint: { route: "user", action: "settings" },
          includeCookies: true,
        } as EasyRequesterConfig)
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
