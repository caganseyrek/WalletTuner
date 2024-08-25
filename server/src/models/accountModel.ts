import mongoose, { Schema } from "mongoose";

const accountSchema: Schema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  belongsToUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  name: { type: String },
  createdAt: { type: String },
  balance: { type: Number },
  monthlyIncome: { type: Number },
  monthlyExpense: { type: Number },
});

export default mongoose.model("accountModel", accountSchema);
