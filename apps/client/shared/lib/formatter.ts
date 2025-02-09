import { format } from "date-fns";

type DateFormatOption =
  | { value: "P"; label: "01/01/2000" }
  | { value: "PP"; label: "Jan 1, 2000" }
  | { value: "PPP"; label: "January 1st, 2000" }
  | { value: "PPPP"; label: "Saturday, January 1st, 2000" };

type CurrencyFormatOption =
  | { label: "Currency Display"; options: { label: string; value: string; desc: string }[] }
  | { label: "Sign Display"; options: { label: string; value: string; desc: string }[] }
  | { label: "Notation"; options: { label: string; value: string; desc: string }[] }
  | { label: "Grouping"; options: { label: string; value: string; desc: string }[] };

interface DateFormatOptions {
  displayTypeKey: DateFormatOption["value"];
}

interface CurrenyFormatOptions {
  locale: string;
  currency: string;
  currencyDisplay: string;
  currencySign: string;
}

class Formatter {
  private static dateFormatValues: DateFormatOption[] = [
    { value: "P", label: "01/01/2000" },
    { value: "PP", label: "Jan 1, 2000" },
    { value: "PPP", label: "January 1st, 2000" },
    { value: "PPPP", label: "Saturday, January 1st, 2000" },
  ];
  private static currencyFormatValues: CurrencyFormatOption[] = [
    {
      label: "Currency Display",
      options: [
        { label: "Code", value: "code", desc: "$12,345.67" },
        { label: "Name", value: "name", desc: "12,345.67 US dollars" },
        { label: "Symbol", value: "symbol", desc: "US$12,345.67" },
        { label: "Narrow Symbol", value: "narrowSymbol", desc: "$12,345.67" },
      ],
    },
    {
      label: "Sign Display",
      options: [
        { label: "Auto", value: "always", desc: "Show the sign when necessary" },
        { label: "Always", value: "always", desc: "Always show the sign, even '+'" },
        { label: "Never", value: "never", desc: "Never show the sign" },
      ],
    },
    {
      label: "Notation",
      options: [
        { label: "Default", value: "default", desc: "$12,345,678" },
        { label: "Short Compact", value: "compact/short", desc: "$12M" },
        { label: "Long Compact", value: "compact/long", desc: "$12 million" },
      ],
    },
    {
      label: "Grouping",
      options: [
        { label: "Use Commas", value: "true", desc: "$12,345.67" },
        { label: "No grouping", value: "false", desc: "$12345.67" },
      ],
    },
  ];

  // private static defaultDateFormat: DateFormatOptions = { displayTypeKey: "P" };
  // private static defaultCurrencyFormat: CurrenyFormatOptions = {};

  // private static getOption() {}

  // public static setOption() {}

  public static formatCurrency(value: number): string {
    const formatted: string = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      currencyDisplay: "narrowSymbol",
      currencySign: "accounting",
      notation: "standard",
      compactDisplay: "long",
      signDisplay: "exceptZero",
      minimumSignificantDigits: 3,
    }).format(value);
    return formatted;
  }

  public static formatDate(date: string | Date): string {
    return format(date, "PP");
  }

  public static capitalize(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  public static getCurrencyFormats(): CurrencyFormatOption[] {
    return this.currencyFormatValues;
  }

  public static getPossible(option: "dateFormats" | "currencyFormats" | "locales") {
    if (option === "dateFormats") {
      return this.dateFormatValues;
    }
    if (option === "currencyFormats") {
      return this.currencyFormatValues;
    }
    if (option === "locales") {
      return Intl.supportedValuesOf("currency");
    }
  }
}

export default Formatter;
