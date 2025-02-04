import mongoose, { Model, Schema } from "mongoose";

import { Subscription } from "./subscription.types";

const subscriptionSchema: Schema = new Schema<Subscription.SubscriptionProps>({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  name: { type: String, unique: true },
  amount: { type: Number },
  billing_cycle: { type: String },
  next_payment_date: { type: String },
  paid_from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "accountModel",
  },
  is_active: { type: Boolean, default: true },
  created_at: { type: String },
});

export default mongoose.model<Subscription.SubscriptionProps>(
  "subscriptionModel",
  subscriptionSchema,
) as Model<Subscription.SubscriptionProps>;
