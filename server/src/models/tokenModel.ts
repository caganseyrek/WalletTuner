import mongoose, { Model, Schema } from "mongoose";

import TokenTypes from "@/types/token";

const tokenSchema: Schema = new Schema<TokenTypes.TokenDetails>({
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

export default mongoose.model<TokenTypes.TokenDetails>(
  "tokenModel",
  tokenSchema,
) as Model<TokenTypes.TokenDetails>;
