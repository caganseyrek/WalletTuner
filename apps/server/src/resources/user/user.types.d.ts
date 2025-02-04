export namespace User {
  export interface UserEditableProps {
    full_name: string;
  }
  export interface UserProps extends UserEditableProps {
    _id: mongoose.Types.ObjectId;
    email: string;
    password_hash: string;
    created_at: string;
  }
  export namespace Controller {
    export type CreateProps = UserEditableProps & Pick<UserProps, "email">;
    export type UpdateProps = UserEditableProps & Pick<UserProps, "_id">;
    export type DeleteProps = Pick<UserProps, "_id">;
  }
  export namespace Service {
    export type CreateProps = Controller.CreateProps & Pick<UserProps, "password_hash">;
    export type UpdateProps = Controller.UpdateProps;
    export type DeleteProps = Controller.DeleteProps;
  }
  export namespace Repository {
    export type CreateProps = Omit<UserProps, "_id">;
    export type UpdateProps = UserEditableProps & Pick<UserProps, "_id">;
    export type DeleteProps = Service.DeleteProps;
  }
  export type FindByIdProps = Pick<UserProps, "_id">;
  export type FindByEmailProps = Pick<UserProps, "email">;
}
