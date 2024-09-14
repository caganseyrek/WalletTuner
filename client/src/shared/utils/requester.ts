import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";

// import i18next from "i18next";

// import { errorMessage } from "@/localization/i18n";

interface endpointProps {
  route: string;
  controller: string;
}

interface RequesterConfig {
  baseURL?: string;
  endpoint: endpointProps;
  method: string;
  headers?: RawAxiosRequestHeaders;
  accessToken?: string;
  currentUser?: string;
  query?: Record<string, string>;
  payload: object;
}

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
// const TOKEN_ENDPOINT = import.meta.env.VITE_APP_TOKEN_ENDPOINT;
// const IS_DEV = Boolean(import.meta.env.VITE_APP_IS_DEV);

const POSSIBLE_STATUS_CODES = [200, 201, 400, 401, 404, 409, 500];

export class Requester {
  private baseURL: string = BACKEND_URL;
  // private tokenEndpoint: string = TOKEN_ENDPOINT;
  private endpoint: { route: string; controller: string };
  private method: string;
  private headers?: RawAxiosRequestHeaders;
  private accessToken?: string;
  // private currentUser?: string;
  private query?: Record<string, string>;
  private payload: object;

  constructor({
    endpoint,
    method,
    headers,
    accessToken,
    // currentUser,
    query,
    payload,
  }: RequesterConfig) {
    this.endpoint = endpoint;
    this.method = method;
    this.accessToken = accessToken;
    this.headers = {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${this.accessToken}` }),
      ...headers,
    };
    // this.currentUser = currentUser;
    this.payload = payload;
    this.query = query;
  }

  async send<TResponseData = null>(): Promise<BackendResponseProps<TResponseData>> {
    let requestUrl = `${this.baseURL}${this.endpoint.route}/${this.endpoint.controller}`;
    if (this.query) {
      const queryString = new URLSearchParams(this.query).toString();
      requestUrl += `?${queryString}`;
    }

    const axiosInstance = axios.create({
      baseURL: requestUrl,
    });
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && POSSIBLE_STATUS_CODES.includes(error.response.status)) {
          return Promise.resolve(error.response.data);
        }
      },
    );

    const axiosConfig: AxiosRequestConfig = {
      url: requestUrl,
      method: this.method,
      headers: this.headers,
      data: this.payload,
      validateStatus: function (status) {
        return POSSIBLE_STATUS_CODES.includes(status);
      },
    };
    const response = await axiosInstance.request<BackendResponseProps<TResponseData>>(axiosConfig);
    return response.data as BackendResponseProps<TResponseData>;
  }

  /*
  FIXME
  private async refresh(): Promise<string | null> {
    try {
      const requestUrl = this.baseURL + this.tokenEndpoint;
      const axiosConfig: AxiosRequestConfig = {
        url: requestUrl,
        method: methods.post,
        headers: { withCredentials: true },
        data: { currentUser: this.currentUser },
      };
      const newToken = await axios(axiosConfig);
      if (newToken.status === 200) {
        this.accessToken = newToken.data.accessToken;
        return newToken.data.accessToken;
      }
      return null;
    } catch (error) {
      IS_DEV && console.error(errorMessage(this.refresh.name, error));
      return null;
    }
  }
  */
}

export enum methods {
  post = "POST",
  patch = "PATCH",
  delete = "DELETE",
}

export enum routes {
  user = "user",
  transaction = "transaction",
  account = "account",
}

export enum controllers {
  login = "login",
  logout = "logout",
  register = "register",
  settings = "settings",
  getDetailsAll = "details/all",
  getDetailsByFilter = "details",
  create = "create",
  update = "update",
  delete = "delete",
}
