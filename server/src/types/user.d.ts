import { Identifier } from "./global";

namespace UserTypes {
  export interface UserDetails {
    _id: mongoose.Types.ObjectId;
    name: string;
    surname: string;
    email: string;
    password: string;
  }

  type SupportedLocaleString =
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

  export interface UserSettings {
    preferredFormat: SupportedLocaleString;
    preferredCurrency: SupportedCurrencies;
    preferredCurrencyDisplay: SupportedDisplayType;
  }

  export type UserDetailsWithSettings = UserDetails & UserSettings;

  export type RegisterParams = Omit<UserDetails, "_id">;
  export type LoginParams = Pick<UserDetails, "email"> & Pick<UserDetails, "password">;
  export type LogoutParams = Identifier;

  export type UpdateUserParams = Identifier & Omit<UserDetails, "_id"> & UserSettings;
  export type DeleteUserParams = Identifier & Pick<UserDetails, "password">;
  export type GetUserSettingsParams = Identifier;

  export interface LoginDetails {
    name: string;
    currentUser: string;
    tokens: { accessToken: string; refreshToken: string };
  }

  export type FindByIdParams = Identifier;
  export type FindWithSettingsByIdParams = Identifier;

  export interface FindByEmailParams {
    email: string;
  }

  export type FindByIdAndUpdateUserParams = Identifier &
    Omit<UserDetails, "_id", "password"> &
    UserSettings;
  export type FindByIdAndDeleteUserParams = Identifier;
}

export default UserTypes;
