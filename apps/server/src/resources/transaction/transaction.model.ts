import mongoose, { Model, Schema } from "mongoose";

import { Transaction } from "./transaction.types";

const transactionSchema: Schema = new Schema<Transaction.TransactionProps>({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "accountModel",
    required: true,
  },
  account_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  type: { type: String },
  amount: { type: Number },
  timestamp: { type: String },
  note: { type: String },
});

export default mongoose.model<Transaction.TransactionProps>(
  "transactionModel",
  transactionSchema,
) as Model<Transaction.TransactionProps>;
