import mongoose, { Model, Schema } from "mongoose";

export interface AccountProps {
  _id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  name: string;
  balance: number;
  total_income: number;
  total_expense: number;
  created_at: Date;
}

const accountSchema: Schema = new Schema<AccountProps>({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userSchema",
  },
  name: { type: String, unique: true },
  balance: { type: Number },
  total_income: { type: Number },
  total_expense: { type: Number },
  created_at: { type: Date },
});

export default mongoose.model<AccountProps>("accountSchema", accountSchema) as Model<AccountProps>;
