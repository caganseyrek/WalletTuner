export namespace Globals {
  export interface IdentifierProps {
    user_id: string;
  }
  export interface ResponseProps {
    isSuccess: boolean;
    responseMessage: string;
    data: object | null;
  }
  export interface MiddlewareArray {
    create: Array;
    update: Array;
    delete: Array;
  }
  export interface UserIdCookie {
    user_id: string;
  }
}
