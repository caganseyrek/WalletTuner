import mongoose, { Model, Schema } from "mongoose";

import AccountTypes from "@/types/accounts";

const accountSchema: Schema = new Schema<AccountTypes.AccountObject>({
  _id: mongoose.Schema.Types.ObjectId,
  belongsToUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  accountName: { type: String },
  createdAt: { type: String },
  balance: { type: Number },
  totalIncome: { type: Number },
  totalExpense: { type: Number },
});

export default mongoose.model<AccountTypes.AccountObject>(
  "accountModel",
  accountSchema,
) as Model<AccountTypes.AccountObject>;
