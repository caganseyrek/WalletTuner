import { Response } from "express";

export namespace GlobalTypes {
  export interface ResponseParameters {
    isSuccess: boolean;
    message: string;
    data: object | null;
  }
  export interface MiddlewareArray {
    [key: string]: Array;
  }

  export interface ServerResponse {
    response: Response;
  }
  export interface Identifiers {
    userId: string;
  }
}
