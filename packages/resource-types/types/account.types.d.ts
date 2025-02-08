import mongoose from "mongoose";
import { Globals } from "./global.types";

export namespace Account {
  export interface AccountProps {
    _id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    name: string;
    balance: number;
    total_income: number;
    total_expense: number;
    created_at: string;
  }
  export interface AccountPropsWithString extends Omit<Omit<AccountProps, "_id">, "user_id"> {
    _id: string;
    user_id: string;
  }
  export namespace Hook {
    export type CreateProps = Pick<AccountPropsWithString, "name">;
    export type UpdateProps = Pick<AccountPropsWithString, "_id"> & Pick<AccountPropsWithString, "name">;
    export type DeleteProps = Pick<AccountPropsWithString, "_id">;
  }
  export namespace Controller {
    export type CreateProps = Globals.UserIdFromCookie & Pick<AccountPropsWithString, "name">;
    export type UpdateProps = Globals.UserIdFromCookie &
      Pick<AccountPropsWithString, "_id"> &
      Pick<AccountPropsWithString, "name">;
    export type DeleteProps = Globals.UserIdFromCookie & Pick<AccountPropsWithString, "_id">;
  }
  export namespace Service {
    export type CreateProps = Globals.IdentifierProps & Pick<AccountProps, "name">;
    export type UpdateProps = Globals.IdentifierProps & Pick<AccountProps, "_id"> & Pick<AccountProps, "name">;
    export type DeleteProps = Globals.IdentifierProps & Pick<AccountProps, "_id">;
  }
  export namespace Repository {
    export type CreateProps = Globals.IdentifierProps & Pick<AccountProps, "name">;
    export type UpdateProps = Globals.IdentifierProps & AccountProps;
    export type DeleteProps = Globals.IdentifierProps & Pick<AccountProps, "_id">;
  }
  export type FindByNameProps = Globals.IdentifierProps & Pick<AccountProps, "name">;
  export type FindByIdProps = Globals.IdentifierProps & Pick<AccountProps, "_id">;
  export type FindByUserIdProps = Globals.IdentifierProps;
}
