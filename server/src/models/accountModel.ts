import mongoose, { Model, Schema } from "mongoose";

import AccountTypes from "@/types/account";

const accountSchema: Schema = new Schema<AccountTypes.AccountDetails>({
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

export default mongoose.model<AccountTypes.AccountDetails>(
  "accountModel",
  accountSchema,
) as Model<AccountTypes.AccountDetails>;
