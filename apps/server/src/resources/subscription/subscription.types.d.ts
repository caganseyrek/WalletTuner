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
    export type CreateProps = Omit<Omit<Omit<SubscriptionProps, "_id">, "user_id">, "created_at">;
    export type UpdateProps = Omit<Omit<SubscriptionProps, "user_id">, "created_at">;
    export type DeleteProps = Pick<SubscriptionProps, "_id">;
  }
  export namespace Service {
    export type CreateProps = Globals.IdentifierProps & Controller.CreateProps;
    export type UpdateProps = Globals.IdentifierProps & Controller.UpdateProps;
    export type DeleteProps = Globals.IdentifierProps & Controller.DeleteProps;
  }
  export namespace Repository {
    export type CreateProps = Globals.IdentifierProps & Controller.CreateProps;
    export type UpdateProps = Globals.IdentifierProps & SubscriptionProps;
    export type DeleteProps = Globals.IdentifierProps & Controller.DeleteProps;
  }
  export type FindByAccountProps = Globals.IdentifierProps & Pick<SubscriptionProps, "paid_from">;
  export type FindByIdProps = Globals.IdentifierProps & Pick<SubscriptionProps, "_id">;
  export type FindByUserIdProps = Globals.IdentifierProps;
}
