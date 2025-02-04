import mongoose, { Model, Schema } from "mongoose";

import { Overview } from "./overview.types";

const overviewSchema: Schema = new Schema<Overview.OverviewModelProps>({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    unique: true,
  },
  total_balance: { type: Number },
  total_income: { type: Number },
  total_expense: { type: Number },
  active_milestone_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "milestoneModel",
    },
  ],
  upcoming_subscription_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subscriptionModel",
    },
  ],
});

export default mongoose.model<Overview.OverviewModelProps>(
  "overviewModel",
  overviewSchema,
) as Model<Overview.OverviewModelProps>;
