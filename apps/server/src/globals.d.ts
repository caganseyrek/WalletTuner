export namespace Globals {
  export interface ResponseProps {
    isSuccess: boolean;
    responseMessage: string;
    data: object | null;
  }
  export interface MiddlewareArray {
    [route: string]: Array;
  }
}
