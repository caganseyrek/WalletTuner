import { AccountProps } from "@/shared/types";
import mongoose, { Model, Schema } from "mongoose";

const accountSchema: Schema = new Schema<AccountProps>({
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

export default mongoose.model<AccountProps>("accountModel", accountSchema) as Model<AccountProps>;
