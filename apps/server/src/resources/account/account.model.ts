import { Account } from "@wallettuner/resource-types";
import mongoose, { Model, Schema } from "mongoose";

const accountSchema: Schema = new Schema<Account.AccountProps>({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  name: { type: String, unique: true },
  balance: { type: Number },
  total_income: { type: Number },
  total_expense: { type: Number },
  created_at: { type: String },
});

export default mongoose.model<Account.AccountProps>("accountModel", accountSchema) as Model<Account.AccountProps>;
