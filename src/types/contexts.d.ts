interface settingsContextProps {
  currency: string;
  setCurrency: (currency: string) => void;

  currencyDisplayType: "abbr" | "symbol";
  setCurrencyDisplayType: (currencyDisplayType: "abbr" | "symbol") => void;

  currencyPosition: "left" | "right";
  setCurrencyPosition: (currencyPosition: "left" | "right") => void;

  currencySpacing: "nbsp" | "none";
  setCurrencySpacing: (currencySpacing: "nbsp" | "none") => void;

  thousandSeperator: "comma" | "dot" | "none";
  setThousandSeperator: (thousandSeperator: "comma" | "dot") => void;

  decimalSeperator: "comma" | "dot";
  setDecimalSeperator: (decimalSeperator: "comma" | "dot") => void;

  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
}

interface modalContextProps {
  modalState: boolean;
  setModalState: (modalState: boolean) => void;
}
