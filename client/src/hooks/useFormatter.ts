import { useMemo } from "react";

import i18next from "i18next";

import { currencies } from "@/data/currencies";

import { errorMessage } from "@/localization/i18n";

import useSettings from "./useSettings";

function useFormatter() {
  const { data: savedSettings } = useSettings();

  const currency = savedSettings?.preferredCurrency;
  const currencyDisplayType = savedSettings?.preferredCurrencyDisplayType;
  const currencySpacing = savedSettings?.preferredCurrencyDisplaySpacing;
  const currencyPosition = savedSettings?.preferredCurrencyDisplayPosition;
  const thousandSeperator = savedSettings?.preferredCurrencyThousandSeperator;
  const decimalSeperator = savedSettings?.preferredCurrencyDecimalSeperator;

  return useMemo(() => {
    const handleSeperators = (value: string): string => {
      const [integer, decimal] = value.split(".");

      const selectedThousandSeperator =
        thousandSeperator === "comma" ? "," : thousandSeperator === "dot" ? "." : "";
      const selectedDecimalSeperator = decimalSeperator === "comma" ? "," : ".";

      const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, selectedThousandSeperator);

      if (!decimal) return formattedInteger;
      return `${formattedInteger}${selectedDecimalSeperator}${decimal}`;
    };

    const selectedCurrency = currencies.find((c) => c.currencyAbbr === currency);
    if (!selectedCurrency) {
      console.error(errorMessage(useFormatter.name, i18next.t("hookMessages.formatterError")));
      return (value: string) => value;
    }

    const displayedCurrency =
      currencyDisplayType === "abbr"
        ? selectedCurrency.currencyAbbr
        : selectedCurrency.currencySymbol;

    const spacing = currencySpacing === "nbsp" ? " " : "";

    return (value: string) =>
      currencyPosition === "left"
        ? `${displayedCurrency}${spacing}${handleSeperators(value)}`
        : `${handleSeperators(value)}${spacing}${displayedCurrency}`;
  }, [
    currency,
    currencyDisplayType,
    currencyPosition,
    currencySpacing,
    thousandSeperator,
    decimalSeperator,
  ]);
}

export default useFormatter;
