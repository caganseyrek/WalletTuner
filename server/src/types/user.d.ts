import { Identifier } from "./global";
import { SupportedCurrencies, SupportedDisplayType, SupportedLocaleString } from "./settings";

namespace UserTypes {
  export namespace Globals {
    export interface UserDetails {
      _id: mongoose.Types.ObjectId;
      name: string;
      surname: string;
      email: string;
      password: string;
    }
    export interface UserSettings {
      preferredFormat: SupportedLocaleString;
      preferredCurrency: SupportedCurrencies;
      preferredCurrencyDisplay: SupportedDisplayType;
    }
    export type UserDetailsWithSettings = UserDetails & UserSettings;
    export interface LoginDetails {
      name: string;
      currentUser: string;
      tokens: { accessToken: string; refreshToken: string };
    }
  }

  export namespace Repository {
    export type CreateNewUserParams = Omit<UserDetails, "_id">;
    export type FindByEmailParams = Pick<UserDetails, "email">;
    export type FindByIdParams = Identifier;
    export type FindWithSettingsByIdParams = Identifier;
    export type FindByIdAndUpdateParams = Identifier & Omit<Omit<UserDetails, "_id">, "password"> & UserSettings;
    export type FindByIdAndDeleteParams = Identifier;
  }

  export namespace Service {
    export type LoginUserParams = Pick<UserDetails, "email"> & Pick<UserDetails, "password">;
    export type LogoutUserParams = Identifier;
    export type GetUserSettingsParams = Identifier;
    export type RegisterUserParams = Omit<UserDetails, "_id">;
    export type UpdateUserParams = Identifier & Omit<UserDetails, "_id"> & UserSettings;
    export type DeleteUserParams = Identifier & Pick<UserDetails, "password">;
  }

  export namespace Controller {
    export type LoginUserParams = Pick<UserDetails, "email"> & Pick<UserDetails, "password">;
    export type LogoutUserParams = Identifier;
    export type GetUserSettingsParams = Identifier;
    export type RegisterUserParams = Omit<UserDetails, "_id">;
    export type UpdateUserParams = Identifier & Omit<UserDetails, "_id"> & UserSettings;
    export type DeleteUserParams = Identifier & Pick<UserDetails, "password">;
  }
}

export default UserTypes;
