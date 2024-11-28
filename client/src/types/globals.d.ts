namespace GlobalTypes {
  export interface AuthDetailsParams {
    accessToken: string | undefined;
    currentUser: string | undefined;
    currentEmail: string | undefined;
    name: string | undefined;
  }

  export interface EssentialRequestParams {
    accessToken?: string;
    currentUser?: string;
  }

  export interface BackendResponseParams<TResponseData = null> {
    isSuccess: boolean;
    message: string;
    data?: TResponseData;
  }
}

export default GlobalTypes;
