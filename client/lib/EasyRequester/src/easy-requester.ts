import Generators from "./utils/generators";
import Debugger from "./utils/debugger";
import Queuer from "./handlers/queuer";
import Aborter from "./handlers/aborter";

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
export type AnyExceptUndefined = Exclude<any, undefined | null>;

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

// eslint-disable-next-line @typescript-eslint/no-namespace
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

/**
 * @description EasyRequester is a customizable HTTP requester and request handler with detailed configuration. See https://github.com/caganseyrek/EasyRequester for more info and details about how to use.
 */
class EasyRequester {
  private POSSIBLE_STATUS_CODES: number[] = [200, 201, 202, 203, 204, 205, 206];

  private requestURLParams: RequesterInternals.RequestURLParams = {
    protocol: "http",
    baseURL: "",
    port: undefined,
    endpoint: "",
    query: undefined,
  };

  private requestHeaderParams: RequesterInternals.RequestHeaderParams = {
    method: "POST",
    contentType: "application/json",
    responseLang: undefined,
    customHeaders: undefined,
    generatedHeaders: undefined,
  };

  private requestAuthParams: RequesterInternals.RequestAuthParams = {
    accessToken: undefined,
    includeCookies: false,
  };

  private requestPayload: RequesterInternals.RequestPayloadType = {};

  private responseDetailsParams: RequesterInternals.ResponseDetailsParams = {
    possibleStatusCodes: this.POSSIBLE_STATUS_CODES,
  };

  private clientParams: RequesterInternals.ClientParams = {
    isDebugMode: false,
    newRequestHandlingMethod: "abort-previous-request",
  };

  private queuer: Queuer = new Queuer();
  private aborter: Aborter = new Aborter();

  constructor() {}

  /**
   * Sets up the configuration for the EasyRequester instance.
   * @param {EasyRequesterConfig} easyRequesterConfig
   * @returns The EasyRequester instance for method chaining.
   * @throws {Error} If required configuration fields are missing or invalid.
   * @example new EasyRequester().setConfig({ ...config });
   */
  public setConfig(easyRequesterConfig: EasyRequesterConfig): EasyRequester {
    Debugger.log(`${this.setConfig.name} at ${EasyRequester.name}`, "Setting up requester config...");
    this.requestURLParams = {
      protocol: easyRequesterConfig.requestConfig.protocol ?? this.requestURLParams.protocol,
      baseURL: easyRequesterConfig.requestConfig.baseURL.replace(/\/$/, ""),
      port: easyRequesterConfig.requestConfig.port,
      endpoint: easyRequesterConfig.requestConfig.endpoint,
      query: easyRequesterConfig.requestConfig.query,
    };
    this.requestHeaderParams = {
      method: easyRequesterConfig.requestConfig.method,
      contentType: easyRequesterConfig.requestConfig.contentType ?? this.requestHeaderParams.contentType,
      responseLang: easyRequesterConfig.requestConfig.responseLang,
      customHeaders: easyRequesterConfig.requestConfig.customHeaders ?? {},
    };
    this.requestAuthParams = {
      accessToken: easyRequesterConfig.requestConfig.accessToken,
      includeCookies: easyRequesterConfig.requestConfig.includeCookies,
    };
    this.requestPayload = easyRequesterConfig.requestConfig.payload ?? this.requestPayload;
    this.responseDetailsParams = {
      possibleStatusCodes: easyRequesterConfig.requestConfig.possibleStatusCodes
        ? this.responseDetailsParams.possibleStatusCodes.concat(easyRequesterConfig.requestConfig.possibleStatusCodes)
        : this.responseDetailsParams.possibleStatusCodes,
    };
    this.clientParams.newRequestHandlingMethod =
      (easyRequesterConfig.clientConfig && easyRequesterConfig.clientConfig.newRequestHandlingMethod) ??
      this.clientParams.newRequestHandlingMethod;

    Debugger.log(`${this.setConfig.name} at ${EasyRequester.name}`, "Successfully set up requester config...");

    return this;
  }

  /**
   * Toggles debug mode for logging request and requester instance details.
   * @param {boolean} [isToggled=false] **Optional**
   * @description If true, enables debug logging. Defaults to `false`.
   * @returns {EasyRequester} The EasyRequester instance for method chaining.
   * @example
   * new EasyRequester().debugMode(true);
   */
  public debugMode(isToggled: boolean = false): EasyRequester {
    this.clientParams.isDebugMode = isToggled;
    Debugger.setDebugMode(this.clientParams.isDebugMode);
    Debugger.log(
      `${this.debugMode.name} at ${EasyRequester.name}`,
      `Debug mode is set to '${this.clientParams.isDebugMode}'`,
    );
    return this;
  }

  /**
   * Sends an HTTP request using the configured settings.
   * @template TResponse - Type of the expected response data.
   * @template TPayload - Type of the payload data.
   * @requires `setConfig()` to set the request configuration.
   * @returns {Promise<TResponse>} A promise with response object that is typeof TResponse.
   * @throws `Error` For HTTP requests that does not match the possible status codes.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async sendRequest<TResponse = any, TPayload = any>(): Promise<TResponse> {
    const generatedURL: string = Generators.generateURL(this.requestURLParams);
    const requestConfig: RequestInit = {};

    if (this.clientParams.newRequestHandlingMethod === "abort-previous-request") {
      this.aborter.setupAbortController(generatedURL, requestConfig);
    }

    const requestFn = async () => {
      try {
        Debugger.log(
          `${requestFn.name} at ${this.sendRequest.name} at ${EasyRequester.name}`,
          "Trying to send request...",
        );
        requestConfig.method = this.requestHeaderParams.method;
        requestConfig.headers = this.requestHeaderParams.generatedHeaders as HeadersInit;
        requestConfig.credentials = this.requestAuthParams.includeCookies ? "include" : "same-origin";

        /**
         * Skip adding request body if request method is either 'GET' or 'HEAD'.
         * See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET
         * See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD
         */
        if (!["GET", "HEAD"].includes(this.requestHeaderParams.method)) {
          requestConfig.body = JSON.stringify(this.requestPayload as TPayload);
          Debugger.log(`${requestFn.name} at ${this.sendRequest.name} at ${EasyRequester.name}`, "Added request body.");
        }
        Debugger.log(
          `${requestFn.name} at ${this.sendRequest.name} at ${EasyRequester.name}`,
          "Skipped adding request body due to request method being 'GET' or 'HEAD'",
        );

        const response = await fetch(generatedURL, requestConfig);
        if (
          this.responseDetailsParams.possibleStatusCodes &&
          this.responseDetailsParams.possibleStatusCodes.includes(response.status)
        ) {
          /**
           * Resolve response data, if the response's status code is among POSSIBLE_STATUS_CODES,
           * or among the additional status codes which is set with the setConfig method.
           */
          Debugger.log(
            `${requestFn.name} at ${this.sendRequest.name} at ${EasyRequester.name}`,
            `Resolving response data. Response status code is ${response.status} which is among possible status codes.`,
          );
          const responseData: TResponse = await response.json();
          Debugger.log(
            `${requestFn.name} at ${this.sendRequest.name} at ${EasyRequester.name}`,
            "Successfully resolved response.",
          );
          return responseData;
        }

        const responseMessage: TResponse = await response.json();
        Debugger.error(
          `${requestFn.name} at ${this.sendRequest.name} at ${EasyRequester.name}`,
          `Request failed with status: ${response.status} - ${response.statusText} with a message ${responseMessage}`,
        );

        /**
         * Delete abortController if request is successful and if newRequestHandlingMethod is "abort-previos-request"
         */
        if (this.clientParams.newRequestHandlingMethod === "abort-previous-request") {
          this.aborter.getControllers().delete(generatedURL);
        }

        /**
         * Return null if the status codes is not among the possible response status codes.
         */
        return null as TResponse;
      } catch (error) {
        /**
         * Write a debug message to terminal if AbortError is caught and if newRequestHandlingMethod is "abort-previos-request"
         */
        if (this.clientParams.newRequestHandlingMethod === "abort-previous-request") {
          this.aborter.handleAbortError(error as Error, generatedURL);
        }
        Debugger.error(
          `${requestFn.name} at ${this.sendRequest.name} at ${EasyRequester.name}`,
          (error as Error).message,
        );
        return null as TResponse;
      }
    };

    /**
     * If newRequestHandlingMethod is "enqueue-new-requests", add the current request to the queue,
     * else just execute the current request.
     */
    if (this.clientParams.newRequestHandlingMethod === "enqueue-new-requests") {
      return this.queuer.enqueueRequest(requestFn);
    }
    return requestFn();
  }
}

export default EasyRequester;
