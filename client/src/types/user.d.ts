declare interface LoginRequestProps {
  email: string;
  password: string;
}

declare interface LoginResponseProps {
  message: string;
  accessToken: string;
  currentUser: string;
  currentEmail: string;
  name: string;
}

declare interface LogoutRequestProps extends EssentialRequestProps {}

interface RegisterRequestProps {
  name: string;
  surname: string;
  email: string;
  password: string;
}

declare type SupportedLocaleString =
  | "en-US"
  | "en-GB"
  | "fr-FR"
  | "de-DE"
  | "es-ES"
  | "it-IT"
  | "ja-jp"
  | "zh-CN"
  | "ko-KR"
  | "pt-BR"
  | "ru-RU"
  | "es-MX"
  | "ar-SA"
  | "nl-NL"
  | "sv-SE"
  | "en-IN";

declare type SupportedCurrencies =
  | "USD"
  | "GBP"
  | "EUR"
  | "JPY"
  | "CNY"
  | "BRL"
  | "RUB"
  | "KRW"
  | "SAR"
  | "SEK"
  | "INR";

declare type SupportedDisplayType = "code" | "name" | "symbol" | "narrowSymbol";

declare interface SettingsRequestProps extends EssentialRequestProps {}

declare interface SettingsResponseProps {
  preferredFormat: SupportedLocaleString;
  preferredCurrency: SupportedCurrencies;
  preferredCurrencyDisplay: SupportedDisplayType;
}
