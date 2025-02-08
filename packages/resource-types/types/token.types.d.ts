import mongoose from "mongoose";

export namespace Token {
  export interface RefreshTokenProps {
    _id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    token: string;
  }
  export type FindByUserIdProps = Pick<RefreshTokenProps, "user_id">;
  export type FindByTokenProps = Pick<RefreshTokenProps, "token">;
  export type CreateProps = Omit<RefreshTokenProps, "_id">;
  export type DeleteProps = Pick<RefreshTokenProps, "user_id">;
}
