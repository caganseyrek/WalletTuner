import mongoose from "mongoose";

export namespace User {
  export interface UserProps {
    _id: mongoose.Types.ObjectId;
    full_name: string;
    email: string;
    password: string;
    created_at: string;
  }
  export interface UserDetailsObject {
    full_name: string;
    email: string;
  }
  export namespace Repository {
    export type CreateProps = Omit<UserProps, "_id">;
    export type UpdateProps = Pick<UserProps, "_id"> & Pick<UserProps, "full_name">;
    export type DeleteProps = Pick<UserProps, "_id">;
  }
  export type FindByIdProps = Pick<UserProps, "_id">;
  export type FindByEmailProps = Pick<UserProps, "email">;
}
