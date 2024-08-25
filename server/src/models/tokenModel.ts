import mongoose, { Schema } from "mongoose";

const tokenSchema: Schema = new Schema({
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

export default mongoose.model("tokenModel", tokenSchema);
