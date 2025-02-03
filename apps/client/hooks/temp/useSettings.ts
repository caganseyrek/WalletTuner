import { useQuery, useQueryClient } from "@tanstack/react-query";

import UserTypes from "@/types/user";

function useSettings() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["userSettings"],
    queryFn: () => queryClient.getQueryData<UserTypes.Settings.SettingsResponseProps>(["userSettings"]),
    initialData: {
      preferredFormat: "en-US",
      preferredCurrency: "USD",
      preferredCurrencyDisplay: "narrowSymbol",
    },
    enabled: false,
  });
}

export default useSettings;
