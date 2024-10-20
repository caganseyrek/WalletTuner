import { useQuery, useQueryClient } from "@tanstack/react-query";

function useSettings() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["userSettings"],
    queryFn: () => queryClient.getQueryData<SettingsResponseProps>(["userSettings"]),
    initialData: {
      preferredFormat: "en-US",
      preferredCurrency: "USD",
      preferredCurrencyDisplay: "narrowSymbol",
    },
    enabled: false,
  });
}

export default useSettings;
