// import GlobalTypes from "@/types/globals";
// import UtilTypes from "@/types/utils";
// import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
// import i18next from "i18next";

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;
// const POSSIBLE_STATUS_CODES = [200, 201, 400, 401, 404, 409, 500];

// class Requester {
//   private protocol: string;
//   private baseURL: string = BACKEND_URL.replace(/\/$/, "");
//   private endpoint: UtilTypes.RequesterTypes.EndpointProps;
//   private method: string;
//   private contentType: string = "application/json";
//   private headers: RawAxiosRequestHeaders;
//   private accessToken: string;
//   private includeCookies: boolean;
//   private query?: Record<string, string>;
//   private payload: object;
//   private responseLanguage: string = i18next.language;

//   constructor(requesterConfig: UtilTypes.RequesterTypes.RequesterConfig) {
//     this.protocol = requesterConfig.protocol ?? "http";
//     this.endpoint = requesterConfig.endpoint;
//     this.method = requesterConfig.method;
//     this.accessToken = requesterConfig.accessToken ?? "";
//     this.includeCookies = requesterConfig.includeCookies ?? false;
//     this.headers = {
//       ...requesterConfig.headers,
//       "Content-Type": this.contentType,
//       ...(requesterConfig.accessToken && { Authorization: `Bearer ${this.accessToken}` }),
//       "Accept-Language": this.responseLanguage,
//     };
//     this.payload = requesterConfig.payload;
//     this.query = requesterConfig.query;
//   }

//   private generateEndpoint(): string {
//     let endpoint: string = "";
//     eslint-disable-next-line @typescript-eslint/no-unused-vars
//     Object.entries(this.endpoint).forEach(([_key, value]) => {
//       const sanitizedValue = value.replace(/^\/|\/$/g, "");
//       endpoint += `/${sanitizedValue}`;
//     });
//     return endpoint;
//   }

//   private generateURL(): string {
//     const urlString: string = `${this.protocol}://${this.baseURL}`;
//     const endpointString: string = this.generateEndpoint();
//     const queryString: string = this.query ? new URLSearchParams(this.query).toString() : "";
//     return `${urlString}${endpointString}`;
//   }

//   async sendRequest<TResponseData = null, TRequestPayload = UtilTypes.RequesterTypes.RequesterConfig>(): Promise<
//     GlobalTypes.BackendResponseParams<TResponseData>
//   > {
//     const axiosInstance = axios.create({ baseURL: this.generateURL() });
//     axiosInstance.interceptors.response.use(
//       (response: AxiosResponse<TResponseData, TRequestPayload>) => {
//         return response;
//       },
//       (error: AxiosError) => {
//         if (error.response && POSSIBLE_STATUS_CODES.includes(error.response.status)) {
//           return Promise.resolve(error.response.data);
//         }
//       },
//     );
//     const axiosConfig: AxiosRequestConfig = {
//       url: this.generateURL(),
//       method: this.method,
//       headers: this.headers,
//       data: this.payload,
//       withCredentials: this.includeCookies,
//       validateStatus: function (status) {
//         return POSSIBLE_STATUS_CODES.includes(status);
//       },
//     };
//     const response: AxiosResponse<TResponseData, TRequestPayload> = await axiosInstance.request<
//       GlobalTypes.BackendResponseParams<TResponseData>,
//       AxiosResponse<TResponseData, TRequestPayload>
//     >(axiosConfig);
//     return response.data as GlobalTypes.BackendResponseParams<TResponseData>;
//   }
// }

// export default Requester;
