import mongoose from "mongoose";

import { Globals } from "@/globals";

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
  export namespace Controller {
    export type CreateProps = Globals.IdentifierProps & Pick<AccountProps, "name">;
    export type UpdateProps = Globals.IdentifierProps & Pick<AccountProps, "_id"> & Pick<AccountProps, "name">;
    export type DeleteProps = Globals.IdentifierProps & Pick<AccountProps, "_id">;
  }
  export namespace Service {
    export type CreateProps = Controller.CreateProps;
    export type UpdateProps = Controller.UpdateProps;
    export type DeleteProps = Controller.DeleteProps;
  }
  export namespace Repository {
    export type CreateProps = Controller.CreateProps;
    export type UpdateProps = Globals.IdentifierProps & AccountProps;
    export type DeleteProps = Controller.DeleteProps;
  }
  export type FindByNameProps = Globals.IdentifierProps & Pick<AccountProps, "name">;
  export type FindByIdProps = Globals.IdentifierProps & Pick<AccountProps, "_id">;
  export type FindByUserIdProps = Globals.IdentifierProps;
}
