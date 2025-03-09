export interface BaseWrapperProps {
  children?: React.ReactNode;
  className?: string;
}

export interface ServerResponseParams<TResponseData = null> {
  isSuccess: boolean;
  responseMessage: string;
  data: TResponseData;
}
