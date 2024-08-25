import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  surname: { type: String },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  preferredCurrency: {
    type: String,
    required: true,
  },
  preferredCurrencyDisplayType: {
    type: String,
    required: true,
  },
  preferredCurrencyDisplayPosition: {
    type: String,
    required: true,
  },
  preferredCurrencyDisplaySpacing: {
    type: String,
    required: true,
  },
  preferredCurrencyThousandSeperator: {
    type: String,
    required: true,
  },
  preferredCurrencyDecimalSeperator: {
    type: String,
    required: true,
  },
});

export default mongoose.model("userModel", userSchema);
