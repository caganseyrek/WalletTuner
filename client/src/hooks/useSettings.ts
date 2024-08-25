import { useQuery, useQueryClient } from "@tanstack/react-query";

function useSettings() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["userSettings"],
    queryFn: () => queryClient.getQueryData<SettingsResponseProps>(["userSettings"]),
    initialData: {
      preferredCurrency: undefined,
      preferredCurrencyDisplayType: undefined,
      preferredCurrencyDisplayPosition: undefined,
      preferredCurrencyDisplaySpacing: undefined,
      preferredCurrencyThousandSeperator: undefined,
      preferredCurrencyDecimalSeperator: undefined,
    },
    enabled: false,
  });
}

export default useSettings;
