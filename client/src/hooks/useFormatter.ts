import HookTypes from "@/types/hook";

import useSettings from "./useSettings";

function useFormatter() {
  const { data: savedSettings } = useSettings();

  if (!savedSettings) {
    return ({ value }: HookTypes.FormatterParams) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumSignificantDigits: 3,
        currencySign: "standard",
        currencyDisplay: "narrowSymbol",
      }).format(value);
  }

  const regionalFormat = savedSettings.preferredFormat;
  const currency = savedSettings.preferredCurrency;
  const currencyDisplayType = savedSettings.preferredCurrencyDisplay;

  return ({ value }: HookTypes.FormatterParams) =>
    new Intl.NumberFormat([regionalFormat, "en-US"], {
      style: "currency",
      currency: currency,
      maximumSignificantDigits: 3,
      currencySign: "standard",
      currencyDisplay: currencyDisplayType as Intl.NumberFormatOptionsCurrencyDisplay,
    }).format(value);
}

export default useFormatter;
