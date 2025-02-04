import { Milestone } from "../milestone/milestone.types";
import { Subscription } from "../subscription/subscription.types";
import { Globals } from "@/globals";

export namespace Overview {
  interface BaseOverviewProps {
    _id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    total_balance: number;
    total_income: number;
    total_expense: number;
  }
  export interface OverviewProps extends BaseOverviewProps {
    active_milestone_ids: Milestone.MilestoneProps[];
    upcoming_subscription_ids: Subscription.SubscriptionProps[];
  }
  export interface OverviewModelProps extends BaseOverviewProps {
    active_milestone_ids: mongoose.Types.ObjectId[];
    upcoming_subscription_ids: mongoose.Types.ObjectId[];
  }
  export namespace Service {
    export type CreateProps = Globals.IdentifierProps;
    export type UpdateProps = Globals.IdentifierProps;
    export type DeleteProps = Globals.IdentifierProps;
  }
  export namespace Repository {
    export type CreateProps = Globals.IdentifierProps;
    export type UpdateProps = Globals.IdentifierProps & OverviewProps;
    export type DeleteProps = Globals.IdentifierProps;
  }
  export type FindByUserIdProps = Globals.IdentifierProps;
}
