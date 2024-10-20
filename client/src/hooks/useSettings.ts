import { useQuery, useQueryClient } from "@tanstack/react-query";

function useSettings() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["userSettings"],
    queryFn: () => queryClient.getQueryData<SettingsResponseProps>(["userSettings"]),
    initialData: {
      preferredFormat: "en-GB",
      preferredCurrency: "en-GB",
      preferredCurrencyDisplay: "narrowSymbol",
    },
    enabled: false,
  });
}

export default useSettings;
