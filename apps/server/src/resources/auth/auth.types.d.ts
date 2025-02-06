import { User } from "./user/user.types";
import { Globals } from "@/globals";

export namespace Auth {
  type AccessToken = { accessToken: string };
  type RefreshToken = { refreshToken: string };
  export namespace Controller {
    export type RegisterProps = Omit<Omit<User.UserProps, "_id">, "created_at">;
    export type LoginProps = Pick<User.UserProps, "email"> & Pick<User.UserProps, "password">;
    export type LogoutProps = Globals.UserIdFromCookie;
    export type NewAccessTokenProps = Globals.UserIdFromCookie & RefreshToken;
    export type GetUserDetailsProps = Globals.UserIdFromCookie;
    export type UpdateUserProps = Globals.UserIdFromCookie & Pick<User.UserProps, "full_name">;
    export type DeleteUserProps = Globals.UserIdFromCookie;
  }
  export namespace Service {
    export type RegisterProps = Omit<Omit<User.UserProps, "_id">, "created_at">;
    export type LoginProps = Pick<User.UserProps, "email"> & Pick<User.UserProps, "password">;
    export type LogoutProps = Pick<User.UserProps, "_id">;
    export type NewAccessTokenProps = Pick<User.UserProps, "_id"> & RefreshToken;
    export type GetUserDetailsProps = Pick<User.UserProps, "_id">;
    export type UpdateUserProps = Pick<User.UserProps, "_id"> & Pick<User.UserProps, "full_name">;
    export type DeleteUserProps = Pick<User.UserProps, "_id">;
  }
  export type FindByIdProps = Pick<UserProps, "_id">;
  export type TokensObject = AccessToken & RefreshToken;
}
