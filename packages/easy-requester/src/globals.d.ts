/**
 * HTTP methods supported by EasyRequester.
 */
export type Methods = "GET" | "HEAD" | "OPTIONS" | "TRACE" | "PUT" | "DELETE" | "POST" | "PATCH" | "CONNECT";

/**
 * HTTP protocols supported by EasyRequester.
 */
export type HttpProtocols = "http" | "https";

/**
 * Utility type to exclude "undefined" and "null" from "any"
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyExceptUndefined = Exclude<any, undefined | null>;

/**
 * Configuration options for the EasyRequester class.
 * @interface EasyRequesterConfig
 * @param {EasyRequesterConfig} config - The configuration object for the request.
 * @description See the usage at https://github.com/caganseyrek/EasyRequester#README
 */
export interface EasyRequesterConfig {
  /**
   * Configuration options for the client (EasyRequester Instance).
   */
  clientConfig?: {
    /**
     * Determines how the client handles multiple requests to the same URL.
     * - `"abort-previous-request"`: Aborts the ongoing request to the same URL when a new request is initiated.
     * - `"enqueue-new-requests"`: Adds the new request to a queue, ensuring sequential execution.
     */
    newRequestHandlingMethod?: "abort-previous-request" | "enqueue-new-requests" | "do-nothing";
  };

  /**
   * Configuration option for the HTTP request.
   * Provides all necessary details for making the HTTP request.
   */
  requestConfig: {
    /**
     * Protocol of the request. Defaults to `https`.
     * @param {HttpProtocols} [protocol="https"] **Optional**
     */
    protocol?: HttpProtocols;

    /**
     * BaseURL of the http request. Should **not** include the endpoint. (e.g. `api.example.com`)
     * @param {string} baseURL **Required**
     */
    baseURL: string;

    /**
     * Port number to use in the base URL. (e.g. `api.example.com:8080`)
     * @param {number} port **Optional**
     */
    port?: number;

    /**
     * The endpoint that comes after the base URL. If you pass an object to endpoint prop, only the values used for generating the endpoint and not the keys.
     * @param {object | string} endpoint **Required**
     * @example
     * config.endpoint = { route: "user", controller: "login" };
     * config.endpoint = "user/login";
     */
    endpoint: object | string;

    /**
     * Method of the http request (e.g., `GET`, `POST`).
     * @param {Methods} method **Required**
     */
    method: Methods;

    /**
     * Custom headers for the request.
     * @param {Record<string, string>} headers **Optional**
     */
    customHeaders?: Record<string, string>;

    /**
     * Content-Type for the request. Defaults to `application/json`.
     * @param {string} [contentType="application/json"] **Optional**
     */
    contentType?: string;

    /**
     * Access token for authorization, if required by the backend.
     * @param {string | number} accessToken **Optional**
     */
    accessToken?: string | number;

    /**
     * Whether to include cookies in the request. Defaults to `false`.
     * @param {boolean} [includeCookies=false] **Optional**
     */
    includeCookies?: boolean;

    /**
     * Language for the response data (Accept-Language header). Does not have a default value.
     * @param {string?} responseLang **Optional**
     */
    responseLang?: string;

    /**
     * List of acceptable status codes that requester does not throw an error when received.
     * Defaults to an array of [200, 201, 202, 203, 204, 205, 206].
     * @param {number[]} statusCodes **Optional**
     */
    possibleStatusCodes?: number[];

    /**
     * Query parameters to include in the request.
     * @param {Record<string, string>} query **Optional**
     */
    query?: Record<string, string>;

    /**
     * The payload data for the request.
     * @param {object | Record<string, string> | string} payload **Required**
     */
    payload?: object | Record<string, string> | string;
  };
}

export namespace RequesterInternals {
  /**
   * Options for handling race conditions in requests
   * You can choose to not handle the race conditions as well
   */
  export type RaceConditionHandlerParams = "abort-previous-request" | "enqueue-new-requests" | "do-nothing";
  export type RequestPayloadType = object | Record<string, string> | string;

  export interface RequestURLParams {
    /**
     * Request protocol, HTTP or HTTPS
     */
    protocol: HttpProtocols;

    /**
     * Base URL for the request without the port, protocol, and the endpoint
     * (e.g. example.com)
     */
    baseURL: string;
    port?: number;

    /**
     * If given object, the requester will build the endpoint
     * using values from the objects but not the keys
     */
    endpoint: object | string;
    query?: Record<string, string>;
  }
  export interface RequestHeaderParams {
    method: Methods;

    /**
     * Should default to "application/json" in the requester
     */
    contentType: string;

    /**
     * Response language if an internationalization option is available
     */
    responseLang?: string;

    /**
     * Optional custom headers
     */
    customHeaders?: Record<string, string>;

    /**
     * This value is generated internally by the requester
     */
    generatedHeaders?: object;
  }
  export interface RequestAuthParams {
    /**
     * Access token for authorization.
     * Bearer is added as prefix automatically
     */
    accessToken?: string | number;
    includeCookies?: boolean;
  }
  export interface ResponseDetailsParams {
    /**
     * List of possible status codes expected in the response
     *
     * If response status is not present in the array and is not 2xx
     * null is returned as response from the requester
     */
    possibleStatusCodes: number[];
  }
  export interface ClientParams {
    isDebugMode: boolean;

    /**
     * Current selected method for handling race conditions
     */
    newRequestHandlingMethod: RaceConditionHandlerParams;
  }
}
