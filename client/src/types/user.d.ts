import GlobalTypes from "./globals";

namespace UserTypes {
  export namespace Mutations {
    export interface LoginRequestParams {
      email: string;
      password: string;
    }
    export interface LoginResponseParams {
      message: string;
      accessToken: string;
      currentUser: string;
      currentEmail: string;
      name: string;
    }
    export type LogoutRequestParams = GlobalTypes.EssentialRequestParams;
    export interface RegisterRequestParams {
      name: string;
      surname: string;
      email: string;
      password: string;
    }
  }

  export namespace Settings {
    type SupportedLocalFormats =
      | "en-US"
      | "en-GB"
      | "fr-FR"
      | "de-DE"
      | "es-ES"
      | "it-IT"
      | "ja-JP"
      | "zh-CN"
      | "ko-KR"
      | "pt-BR"
      | "ru-RU"
      | "es-MX"
      | "ar-SA"
      | "nl-NL"
      | "sv-SE"
      | "en-IN";

    type SupportedCurrencies =
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

    type SupportedDisplayType = "code" | "name" | "symbol" | "narrowSymbol";
    export type SettingsRequestProps = GlobalTypes.EssentialRequestParams;
    export interface SettingsResponseProps {
      preferredFormat: SupportedLocalFormats;
      preferredCurrency: SupportedCurrencies;
      preferredCurrencyDisplay: SupportedDisplayType;
    }
  }
}

export default UserTypes;
