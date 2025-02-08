export type Methods = "GET" | "HEAD" | "OPTIONS" | "TRACE" | "PUT" | "DELETE" | "POST" | "PATCH" | "CONNECT";

export type HttpProtocols = "http" | "https";

export type RaceConditionHandlerParams = "abort-previous" | "enqueue-new";

export type PayloadType = object | Record<string, string> | string;

export interface ClientConfig {
  // isDebugMode?: boolean;
  onNewRequest?: RaceConditionHandlerParams;
  acceptStatusCodes?: number[];
}

export interface RequestConfig {
  url: {
    protocol?: HttpProtocols;
    baseURL: string;
    port?: number;
    endpoint: object | string;
    query?: Record<string, string>;
  };
  header: {
    method: Methods;
    contentType?: string;
    responseLang?: string;
    headers?: Record<string, string>;
  };
  auth: {
    accessToken?: string | number;
    includeCookies?: boolean;
  };
  payload?: PayloadType;
}

export namespace ConfigSection {
  export interface ClientParams {
    setDebugMode: boolean;
    onNewRequest?: RaceConditionHandlerParams;
    acceptStatusCodes?: number[];
  }
  export interface URLParams {
    protocol?: HttpProtocols;
    baseURL: string;
    port?: number;
    endpoint: object | string;
    query?: Record<string, string>;
  }
  export interface HeaderParams {
    method: Methods;
    contentType: string;
    responseLang?: string;
    customHeaders?: Record<string, string>;
  }
  export interface AuthParams {
    accessToken?: string | number;
    includeCookies?: boolean;
  }
}
