import { RawAxiosRequestHeaders } from "axios";

namespace UtilTypes {
  export namespace RequesterTypes {
    type APIRoutes = "user" | "transaction" | "account";

    type APIActions =
      | "login"
      | "logout"
      | "settings"
      | "register"
      | "all"
      | "create"
      | "update"
      | "delete"
      | "validate";

    interface EndpointProps {
      route: APIRoutes;
      action: APIActions;
    }

    type RequestProtocols = "http" | "https";
    type RequestMethods = "GET" | "POST" | "PATCH" | "DELETE";

    export interface RequesterConfig {
      protocol?: RequestProtocols;
      baseURL?: string;
      endpoint: EndpointProps;
      method: RequestMethods;
      headers?: RawAxiosRequestHeaders;
      accessToken?: string;
      includeCookies?: boolean;
      query?: Record<string, string>;
      payload: object;
    }
  }
}

export default UtilTypes;
