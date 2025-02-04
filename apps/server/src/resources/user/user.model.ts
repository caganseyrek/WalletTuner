import mongoose, { Model, Schema } from "mongoose";

import { User } from "./user.types";

const userSchema: Schema = new Schema<User.UserProps>({
  _id: mongoose.Schema.Types.ObjectId,
  full_name: { type: String },
  password_hash: { type: String },
  created_at: { type: String },
});

export default mongoose.model<User.UserProps>("userModel", userSchema) as Model<User.UserProps>;
