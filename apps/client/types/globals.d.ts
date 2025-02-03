namespace GlobalTypes {
  export interface AuthDetailsParams {
    email: string | undefined;
    name: string | undefined;
  }

  export interface BackendResponseParams<TResponseData = null> {
    isSuccess: boolean;
    message: string;
    data?: TResponseData;
  }

  export interface FormatterParams {
    value: number;
  }
}

export default GlobalTypes;
