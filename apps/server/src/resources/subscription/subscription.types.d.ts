import mongoose from "mongoose";

import { Globals } from "@/globals";

export namespace Subscription {
  export interface SubscriptionProps {
    _id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    name: string;
    amount: number;
    billing_cycle: "monthly" | "yearly";
    next_payment_date: string;
    paid_from: mongoose.Types.ObjectIds;
    is_active: boolean;
    created_at: string;
  }
  export namespace Controller {
    export type CreateProps = Globals.IdentifierProps &
      Omit<Omit<Omit<SubscriptionProps, "_id">, "user_id">, "created_at">;
    export type UpdateProps = Globals.IdentifierProps & Omit<Omit<SubscriptionProps, "user_id">, "created_at">;
    export type DeleteProps = Globals.IdentifierProps & Pick<SubscriptionProps, "_id">;
  }
  export namespace Service {
    export type CreateProps = Controller.CreateProps;
    export type UpdateProps = Controller.UpdateProps;
    export type DeleteProps = Controller.DeleteProps;
  }
  export namespace Repository {
    export type CreateProps = Controller.CreateProps;
    export type UpdateProps = Globals.IdentifierProps & SubscriptionProps;
    export type DeleteProps = Controller.DeleteProps;
  }
  export type FindByAccountProps = Globals.IdentifierProps & Pick<SubscriptionProps, "paid_from">;
  export type FindByIdProps = Globals.IdentifierProps & Pick<SubscriptionProps, "_id">;
  export type FindByUserIdProps = Globals.IdentifierProps;
}
