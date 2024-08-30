import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import i18next from "i18next";

import { errorMessage } from "@/localization/i18n";

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
const TOKEN_ENDPOINT = import.meta.env.VITE_APP_TOKEN_ENDPOINT;

export class Requester {
  private baseURL: string = BACKEND_URL;
  private tokenEndpoint: string = TOKEN_ENDPOINT;
  private endpoint: { route: string; controller: string };
  private method: string;
  private headers?: RawAxiosRequestHeaders;
  private accessToken?: string;
  private currentUser?: string;
  private query?: Record<string, string>;
  private payload: object;

  constructor({
    endpoint,
    method,
    headers,
    accessToken,
    currentUser,
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
    this.currentUser = currentUser;
    this.payload = payload;
    this.query = query;
  }

  async send<TResponse>(): Promise<TResponse> {
    let requestUrl = `${this.baseURL}${this.endpoint.route}/${this.endpoint.controller}`;
    if (this.query) {
      const queryString = new URLSearchParams(this.query).toString();
      requestUrl += `?${queryString}`;
    }
    const axiosConfig: AxiosRequestConfig = {
      url: requestUrl,
      method: this.method,
      headers: this.headers,
      data: this.payload,
    };
    try {
      const response = await axios<TResponse>(axiosConfig);
      return response.data as TResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 && error.response.data.message === "Expired Token") {
          const newAccessToken = await this.refresh();
          if (newAccessToken) return this.send<TResponse>();
          return null as TResponse;
        }
        console.error(errorMessage(this.send.name, error.response?.data || error.message));
        throw new Error(error.response?.data || error.message);
      }
      console.error(errorMessage(this.send.name, error));
      throw new Error(i18next.t("requesterInstanceMessages.error"));
    }
  }

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
      console.error(errorMessage(this.refresh.name, error));
      return null;
    }
  }
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
  accountDetailsAll = "details/all",
  accountDetailsByFilter = "details",
  createAccount = "create",
  updateAccount = "update",
  deleteAccount = "delete",
}
