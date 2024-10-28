import { TransactionProps } from "@/shared/types";
import mongoose, { Model, Schema } from "mongoose";

const transactionSchema: Schema = new Schema<TransactionProps>({
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

export default mongoose.model<TransactionProps>(
  "transactionModel",
  transactionSchema,
) as Model<TransactionProps>;
