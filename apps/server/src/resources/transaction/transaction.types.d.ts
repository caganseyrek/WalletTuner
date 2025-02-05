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
  export namespace Controller {
    export type CreateProps = Globals.IdentifierProps & Omit<Omit<TransactionProps, "_id">, "user_id">;
    export type UpdateProps = Globals.IdentifierProps & Omit<TransactionProps, "user_id">;
    export type DeleteProps = Globals.IdentifierProps & Pick<TransactionProps, "_id">;
  }
  export namespace Service {
    export type CreateProps = Controller.CreateProps;
    export type UpdateProps = Controller.UpdateProps;
    export type DeleteProps = Controller.DeleteProps;
  }
  export namespace Repository {
    export type CreateProps = Controller.CreateProps;
    export type UpdateProps = Controller.UpdateProps;
    export type DeleteProps = Controller.DeleteProps;
  }
  export type FindByIdProps = Globals.IdentifierProps & Pick<TransactionProps, "_id">;
  export type FindByAccountIdProps = Globals.IdentifierProps & Pick<TransactionProps, "account_id">;
  export type FindByUserIdProps = Globals.IdentifierProps;
}
