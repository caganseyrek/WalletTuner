import mongoose, { Model, Schema } from "mongoose";

import TokenTypes from "@/types/token";

const tokenSchema: Schema = new Schema<TokenTypes.TokenObject>({
  _id: mongoose.Schema.Types.ObjectId,
  refreshToken: {
    type: String,
    unique: true,
    required: true,
  },
  belongsTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
});

export default mongoose.model<TokenTypes.TokenObject>("tokenModel", tokenSchema) as Model<TokenTypes.TokenObject>;
