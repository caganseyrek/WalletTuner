import { Token } from "@wallettuner/resource-types";
import mongoose, { Model, Schema } from "mongoose";

const refreshTokenSchema: Schema = new Schema<Token.RefreshTokenProps>({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  token: { type: String },
});

export default mongoose.model<Token.RefreshTokenProps>(
  "refreshTokenModel",
  refreshTokenSchema,
) as Model<Token.RefreshTokenProps>;
