import { UserProps } from "@/shared/types";
import mongoose, { Model, Schema } from "mongoose";

const userSchema: Schema = new Schema<UserProps>({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  surname: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  preferredFormat: { type: String, required: true },
  preferredCurrency: { type: String, required: true },
  preferredCurrencyDisplay: { type: String, required: true },
});

export default mongoose.model<UserProps>("userModel", userSchema) as Model<UserProps>;
