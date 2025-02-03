import Generators from "./utils/generators";
import Debugger from "./utils/debugger";
import Queuer from "./handlers/queuer";
import Aborter from "./handlers/aborter";

import type { EasyRequesterConfig, RequesterInternals } from "./globals";

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
