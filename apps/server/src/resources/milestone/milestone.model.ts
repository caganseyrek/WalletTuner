import mongoose, { Model, Schema } from "mongoose";

import { Milestone } from "./milestone.types";

const milestoneSchema: Schema = new Schema<Milestone.MilestoneProps>({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  account_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "accountModel",
  },
  name: { type: String, unique: true },
  target_amount: { type: Number },
  progress: { type: Number },
  start_date: { type: String },
  end_date: { type: String },
  status: { type: String },
});

export default mongoose.model<Milestone.MilestoneProps>(
  "milestoneModel",
  milestoneSchema,
) as Model<Milestone.MilestoneProps>;
