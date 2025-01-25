import mongoose, { Model, Schema } from "mongoose";

import UserTypes from "@/types/user";

const userSchema: Schema = new Schema<UserTypes.Settings.UserWithSettingsObject>({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  surname: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  preferredFormat: { type: String, required: true },
  preferredCurrency: { type: String, required: true },
  preferredCurrencyDisplay: { type: String, required: true },
});

export default mongoose.model<UserTypes.Settings.UserWithSettingsObject>(
  "userModel",
  userSchema,
) as Model<UserTypes.Settings.UserWithSettingsObject>;
