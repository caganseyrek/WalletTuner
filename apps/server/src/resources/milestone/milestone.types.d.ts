import mongoose from "mongoose";

import { Globals } from "@/globals";

export namespace Milestone {
  export interface MilestoneProps {
    _id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    account_id: mongoose.Types.ObjectId;
    name: string;
    target_amount: number;
    progress: number;
    start_date: string;
    end_date: string;
    status: "not_started" | "ongoing" | "success" | "failed";
  }
  export interface MilestonePropsWithString extends Omit<Omit<Omit<MilestoneProps, "_id">, "user_id">, "account_id"> {
    _id: string;
    user_id: string;
    account_id: string;
  }
  export namespace Controller {
    export type CreateProps = Globals.UserIdFromCookie &
      Omit<Omit<Omit<MilestonePropsWithString, "_id">, "user_id">, "progress">;
    export type UpdateProps = Globals.UserIdFromCookie & Omit<Omit<MilestonePropsWithString, "user_id">, "progress">;
    export type DeleteProps = Globals.UserIdFromCookie & Pick<MilestonePropsWithString, "_id">;
  }
  export namespace Service {
    export type CreateProps = Globals.IdentifierProps & Omit<Omit<Omit<MilestoneProps, "_id">, "user_id">, "progress">;
    export type UpdateProps = Globals.IdentifierProps & Omit<Omit<MilestoneProps, "user_id">, "progress">;
    export type DeleteProps = Globals.IdentifierProps & Pick<MilestoneProps, "_id">;
  }
  export namespace Repository {
    export type CreateProps = Globals.IdentifierProps & Omit<Omit<MilestoneProps, "_id">, "user_id">;
    export type UpdateProps = Globals.IdentifierProps & Omit<MilestoneProps, "user_id">;
    export type DeleteProps = Globals.IdentifierProps & Pick<MilestoneProps, "_id">;
  }
  export type FindByAccountProps = Globals.IdentifierProps & Pick<MilestoneProps, "account_id">;
  export type FindByIdProps = Globals.IdentifierProps & Pick<MilestoneProps, "_id">;
  export type FindByUserIdProps = Globals.IdentifierProps;
}
