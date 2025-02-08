import mongoose from "mongoose";
import { Globals } from "./global.types";

export namespace Subscription {
  export interface SubscriptionProps {
    _id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    name: string;
    amount: number;
    billing_cycle: "monthly" | "yearly";
    next_payment_date: string;
    paid_from: mongoose.Types.ObjectId;
    is_active: boolean;
    created_at: string;
  }
  export interface SubscriptionPropsWithString
    extends Omit<Omit<Omit<SubscriptionProps, "_id">, "user_id">, "paid_from"> {
    _id: string;
    user_id: string;
    paid_from: string;
  }
  export namespace Hook {
    export type CreateProps = Omit<Omit<Omit<SubscriptionPropsWithString, "_id">, "user_id">, "created_at">;
    export type UpdateProps = Omit<Omit<SubscriptionPropsWithString, "user_id">, "created_at">;
    export type DeleteProps = Pick<SubscriptionPropsWithString, "_id">;
  }
  export namespace Controller {
    export type CreateProps = Globals.UserIdFromCookie &
      Omit<Omit<Omit<SubscriptionPropsWithString, "_id">, "user_id">, "created_at">;
    export type UpdateProps = Globals.UserIdFromCookie &
      Omit<Omit<SubscriptionPropsWithString, "user_id">, "created_at">;
    export type DeleteProps = Globals.UserIdFromCookie & Pick<SubscriptionPropsWithString, "_id">;
  }
  export namespace Service {
    export type CreateProps = Globals.IdentifierProps &
      Omit<Omit<Omit<SubscriptionProps, "_id">, "user_id">, "created_at">;
    export type UpdateProps = Globals.IdentifierProps & Omit<Omit<SubscriptionProps, "user_id">, "created_at">;
    export type DeleteProps = Globals.IdentifierProps & Pick<SubscriptionProps, "_id">;
  }
  export namespace Repository {
    export type CreateProps = Globals.IdentifierProps &
      Omit<Omit<Omit<SubscriptionProps, "_id">, "user_id">, "created_at">;
    export type UpdateProps = Globals.IdentifierProps & SubscriptionProps;
    export type DeleteProps = Globals.IdentifierProps & Pick<SubscriptionProps, "_id">;
  }
  export type FindByAccountProps = Globals.IdentifierProps & Pick<SubscriptionProps, "paid_from">;
  export type FindByIdProps = Globals.IdentifierProps & Pick<SubscriptionProps, "_id">;
  export type FindByUserIdProps = Globals.IdentifierProps;
}
