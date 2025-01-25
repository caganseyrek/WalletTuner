import { GlobalTypes } from "./globals";
import { SupportedCurrencies, SupportedDisplayType, SupportedLocaleString } from "./settings";

namespace UserTypes {
  export interface UserObject {
    _id: mongoose.Types.ObjectId;
    name: string;
    surname: string;
    email: string;
    password: string;
  }
  export interface LoginDetailsObject {
    name: string;
  }
  export type LoginUserParams = GlobalTypes.ServerResponse & Pick<UserObject, "email"> & Pick<UserObject, "password">;
  export type LogoutUserParams = GlobalTypes.Identifiers & GlobalTypes.ServerResponse;
  export namespace Settings {
    export interface UserSettingsObject {
      preferredFormat: SupportedLocaleString;
      preferredCurrency: SupportedCurrencies;
      preferredCurrencyDisplay: SupportedDisplayType;
    }
    export type UserWithSettingsObject = UserObject & UserSettingsObject;
    export type SupportedLocaleString =
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
    export type SupportedCurrencies =
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
    export type SupportedDisplayType = "code" | "name" | "symbol" | "narrowSymbol";
  }
  export namespace Repository {
    export type FindUserById = GlobalTypes.Identifiers;
    export type FindUserByEmailParams = Pick<UserObject, "email">;
    export type FindSettingsByIdParams = GlobalTypes.Identifiers;
    export type UpdateUserParams = Omit<Omit<UserObject, "_id">, "password"> & UserSettings;
    export type CreateUserParams = Omit<UserObject, "_id">;
    export type DeleteUserParams = GlobalTypes.Identifiers;
  }
  export namespace Service {
    export type GetUserSettingsParams = GlobalTypes.Identifiers;
    export type RegisterUserParams = Omit<UserObject, "_id">;
    export type UpdateUserParams = Omit<UserObject, "_id"> & UserSettings;
    export type DeleteUserParams = GlobalTypes.Identifiers & Pick<UserObject, "password">;
  }
  export namespace Controller {
    export type RegisterUserParams = Omit<UserObject, "_id">;
    export type UpdateUserParams = Omit<UserObject, "_id"> & UserSettings;
    export type DeleteUserParams = Pick<UserObject, "password">;
  }
}

export default UserTypes;
