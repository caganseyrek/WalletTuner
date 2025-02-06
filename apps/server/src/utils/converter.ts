import mongoose from "mongoose";

class Converter {
  public static toObjectId(string: string): mongoose.Types.ObjectId {
    return new mongoose.Types.ObjectId(string);
  }
}

export default Converter;
