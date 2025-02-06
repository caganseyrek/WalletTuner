import mongoose from "mongoose";

import { Globals } from "@/globals";

export namespace Transaction {
  export interface TransactionProps {
    _id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    account_id: mongoose.Types.ObjectId;
    type: string;
    amount: number;
    timestamp: string;
    note: string;
  }
  export interface TransactionPropsWithString
    extends Omit<Omit<Omit<TransactionProps, "_id">, "user_id">, "account_id"> {
    _id: string;
    user_id: string;
    account_id: string;
  }
  export namespace Controller {
    export type CreateProps = Globals.UserIdFromCookie & Omit<Omit<TransactionPropsWithString, "_id">, "user_id">;
    export type UpdateProps = Globals.UserIdFromCookie & Omit<TransactionPropsWithString, "user_id">;
    export type DeleteProps = Globals.UserIdFromCookie & Pick<TransactionPropsWithString, "_id">;
  }
  export namespace Service {
    export type CreateProps = Globals.IdentifierProps & Omit<Omit<TransactionProps, "_id">, "user_id">;
    export type UpdateProps = Globals.IdentifierProps & Omit<TransactionProps, "user_id">;
    export type DeleteProps = Globals.IdentifierProps & Pick<TransactionProps, "_id">;
  }
  export namespace Repository {
    export type CreateProps = Globals.IdentifierProps & Omit<Omit<TransactionProps, "_id">, "user_id">;
    export type UpdateProps = Globals.IdentifierProps & Omit<TransactionProps, "user_id">;
    export type DeleteProps = Globals.IdentifierProps & Pick<TransactionProps, "_id">;
  }
  export type FindByIdProps = Globals.IdentifierProps & Pick<TransactionProps, "_id">;
  export type FindByAccountIdProps = Globals.IdentifierProps & Pick<TransactionProps, "account_id">;
  export type FindByUserIdProps = Globals.IdentifierProps;
}
