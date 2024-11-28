import statusCodes from "@/utils/statusCodes";

export interface Identifier {
  currentUser: string;
}

// export type ErrorSeverity = "operational" | "critical";

export interface AppErrorParams {
  statusCode: statusCodes;
  message: string;
}

export interface MiddlewareArray {
  [key: string]: Array;
}
