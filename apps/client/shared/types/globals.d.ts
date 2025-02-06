export interface ServerResponseParams<TResponseData = null> {
  isSuccess: boolean;
  responseMessage: string;
  data: TResponseData;
}
