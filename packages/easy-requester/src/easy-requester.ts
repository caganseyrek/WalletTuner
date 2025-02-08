import Generators from "./utils/generators";
import RequestQueuer from "./handlers/requestQueuer";
import RequestAborter from "./handlers/requestAborter";

import type { ClientConfig, RequestConfig } from "./globals";

class EasyRequester {
  private POSSIBLE_STATUS_CODES: number[] = [200, 201, 202, 203, 204, 205, 206];

  private requestConfig!: RequestConfig;
  private clientConfig: ClientConfig;
  private requestQueuer: RequestQueuer = new RequestQueuer();
  private requestAborter: RequestAborter = new RequestAborter();

  constructor(clientConfig: ClientConfig) {
    this.clientConfig = {
      onNewRequest: clientConfig.onNewRequest ?? "enqueue-new",
      acceptStatusCodes: clientConfig.acceptStatusCodes
        ? this.POSSIBLE_STATUS_CODES.concat(clientConfig.acceptStatusCodes)
        : this.POSSIBLE_STATUS_CODES,
    };
  }

  public setRequestConfig(requestConfig: RequestConfig): ConfiguredRequester {
    this.requestConfig = {
      url: {
        protocol: requestConfig.url.protocol ?? "http",
        baseURL: requestConfig.url.baseURL,
        port: requestConfig.url.port,
        endpoint: requestConfig.url.endpoint,
        query: requestConfig.url.query,
      },
      header: {
        method: requestConfig.header.method,
        contentType: requestConfig.header.contentType ?? "Content-Type: application/json",
        responseLang: requestConfig.header.responseLang,
        headers: requestConfig.header.headers ?? {},
      },
      auth: {
        accessToken: requestConfig.auth.accessToken,
        includeCookies: requestConfig.auth.includeCookies ?? false,
      },
      payload: requestConfig.payload,
    };
    return new ConfiguredRequester(this.requestConfig, this.clientConfig, this.requestQueuer, this.requestAborter);
  }
}

class ConfiguredRequester {
  private requestConfig!: RequestConfig;
  private clientConfig: ClientConfig;
  private requestQueuer: RequestQueuer;
  private requestAborter: RequestAborter;

  constructor(
    requestConfig: RequestConfig,
    clientConfig: ClientConfig,
    requestQueuer: RequestQueuer,
    requestAborter: RequestAborter,
  ) {
    this.requestConfig = requestConfig;
    this.clientConfig = clientConfig;
    this.requestQueuer = requestQueuer;
    this.requestAborter = requestAborter;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async sendRequest<TResponse = any, TPayload = any>(): Promise<TResponse> {
    const generatedURL: string = Generators.generateURL(this.requestConfig.url);
    const requestConfig: RequestInit = {};

    if (this.clientConfig.onNewRequest === "abort-previous") {
      this.requestAborter.setupAbortController(generatedURL, requestConfig);
    }
    const requestFn = async () => {
      try {
        requestConfig.method = this.requestConfig.header.method;
        requestConfig.headers = this.requestConfig.header.headers as HeadersInit;
        requestConfig.credentials = this.requestConfig.auth.includeCookies ? "include" : "same-origin";

        /**
         * Skip adding request body if request method is either 'GET' or 'HEAD'.
         * See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET
         * See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD
         */
        if (!["GET", "HEAD"].includes(this.requestConfig.header.method)) {
          requestConfig.body = JSON.stringify(this.requestConfig.payload as TPayload);
        }
        const response = await fetch(generatedURL, requestConfig);

        if (this.clientConfig.acceptStatusCodes && this.clientConfig.acceptStatusCodes.includes(response.status)) {
          const responseData: TResponse = await response.json();
          return responseData;
        }

        if (this.clientConfig.onNewRequest === "abort-previous") {
          this.requestAborter.getControllers().delete(generatedURL);
        }
        return null as TResponse;
      } catch {
        if (this.clientConfig.onNewRequest === "abort-previous") {
          this.requestAborter.handleAbortError(generatedURL);
        }
        return null as TResponse;
      }
    };
    if (this.clientConfig.onNewRequest === "enqueue-new") {
      return this.requestQueuer.enqueueRequest(requestFn);
    }
    return requestFn();
  }
}

export default EasyRequester;
