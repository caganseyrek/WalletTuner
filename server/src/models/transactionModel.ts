import mongoose, { Schema } from "mongoose";

const transactionSchema: Schema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  belongsToAccount: {
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
  transactionDatetime: { type: String },
  transactionValue: { type: Number },
});

export default mongoose.model("transactionModel", transactionSchema);
