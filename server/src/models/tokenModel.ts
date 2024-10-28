import { TokenProps } from "@/shared/types";
import mongoose, { Model, Schema } from "mongoose";

const tokenSchema: Schema = new Schema<TokenProps>({
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

export default mongoose.model<TokenProps>("tokenModel", tokenSchema) as Model<TokenProps>;
