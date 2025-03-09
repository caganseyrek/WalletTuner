import { User } from "@wallettuner/resource-types";
import mongoose, { Model, Schema } from "mongoose";

const userSchema: Schema = new Schema<User.UserProps>({
  _id: mongoose.Schema.Types.ObjectId,
  full_name: { type: String },
  email: { type: String },
  password: { type: String },
  created_at: { type: String },
});

export default mongoose.model<User.UserProps>("userModel", userSchema) as Model<User.UserProps>;
