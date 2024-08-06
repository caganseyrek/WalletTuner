import { createContext, FC, ReactNode, useState } from "react";

export const settingsContext = createContext<settingsContextProps>({
  currency: "usd",
  setCurrency: () => {},

  currencyDisplayType: "symbol",
  setCurrencyDisplayType: () => {},

  currencyPosition: "left",
  setCurrencyPosition: () => {},

  currencySpacing: "nbsp",
  setCurrencySpacing: () => {},

  thousandSeperator: "comma",
  setThousandSeperator: () => {},

  decimalSeperator: "dot",
  setDecimalSeperator: () => {},

  theme: "light",
  setTheme: () => {},
});

const SettingsContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<string>("USD");
  const [currencyDisplayType, setCurrencyDisplayType] = useState<
    "abbr" | "symbol"
  >("symbol");
  const [currencyPosition, setCurrencyPosition] = useState<"left" | "right">(
    "left",
  );
  const [currencySpacing, setCurrencySpacing] = useState<"nbsp" | "none">(
    "nbsp",
  );
  const [thousandSeperator, setThousandSeperator] = useState<
    "comma" | "dot" | "none"
  >("comma");
  const [decimalSeperator, setDecimalSeperator] = useState<"comma" | "dot">(
    "dot",
  );
  const [theme, setTheme] = useState<"dark" | "light">("light");

  return (
    <settingsContext.Provider
      value={{
        currency,
        setCurrency,
        currencyDisplayType,
        setCurrencyDisplayType,
        currencyPosition,
        setCurrencyPosition,
        currencySpacing,
        setCurrencySpacing,
        thousandSeperator,
        setThousandSeperator,
        decimalSeperator,
        setDecimalSeperator,
        theme,
        setTheme,
      }}>
      {children}
    </settingsContext.Provider>
  );
};
export default SettingsContextProvider;
