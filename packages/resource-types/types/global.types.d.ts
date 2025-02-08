import mongoose from "mongoose";

export namespace Globals {
  export interface IdentifierProps {
    user_id: mongoose.Types.ObjectId;
  }
  export interface UserIdFromCookie {
    user_id: string;
  }
}
