import mongoose, { Model, Schema } from "mongoose";

import TransactionTypes from "@/types/transactions";

const transactionSchema: Schema = new Schema<TransactionTypes.TransactionObject>({
  _id: mongoose.Schema.Types.ObjectId,
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "accountModel",
    required: true,
  },
  belongsToUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  transactionType: { type: String },
  transactionDescription: { type: String },
  transactionDateTime: { type: String },
  transactionValue: { type: Number },
});

export default mongoose.model<TransactionTypes.TransactionObject>(
  "transactionModel",
  transactionSchema,
) as Model<TransactionTypes.TransactionObject>;
