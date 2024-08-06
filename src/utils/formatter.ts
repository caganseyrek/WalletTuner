import { useContext } from "react";

import { settingsContext } from "../context/SettingsContext";
import { currencies } from "../data/currencies";

export function format(value: string): string {
  const { currency, currencyDisplayType, currencyPosition, currencySpacing } =
    useContext(settingsContext);

  const selectedCurrency = currencies.find((c) => {
    if (c.currencyAbbr === currency) return c;
  });

  if (!selectedCurrency) return `FormattingError - value: ${value}`;

  const displayedCurrency =
    currencyDisplayType === "abbr"
      ? selectedCurrency.currencyAbbr
      : selectedCurrency.currencySymbol;

  const spacing = currencySpacing === "nbsp" ? " " : "";

  let formattedValue: string = "";
  let seperatedValue = setSeperators(value);

  if (currencyPosition === "left") {
    formattedValue = `${displayedCurrency}${spacing}${seperatedValue}`;
  } else if (currencyPosition === "right") {
    formattedValue = `${seperatedValue}${spacing}${displayedCurrency}`;
  }

  return formattedValue;
}

function setSeperators(value: string): string {
  const { thousandSeperator, decimalSeperator } = useContext(settingsContext);

  const [integer, decimal] = value.split(".");
  const selectedThousandSeperator =
    thousandSeperator === "comma"
      ? ","
      : thousandSeperator === "dot"
        ? "."
        : "";

  const selectedDecimalSeperator = decimalSeperator === "comma" ? "," : ".";

  const formattedInteger = integer.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    selectedThousandSeperator,
  );

  if (!decimal) return formattedInteger;

  return `${formattedInteger}${selectedDecimalSeperator}${decimal}`;
}
