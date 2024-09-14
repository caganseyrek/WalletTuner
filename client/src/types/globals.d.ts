declare interface AuthDetailsProps {
  accessToken: string | undefined;
  currentUser: string | undefined;
  currentEmail: string | undefined;
  name: string | undefined;
}

declare interface EssentialRequestProps {
  accessToken?: string;
  currentUser?: string;
}

declare interface BackendResponseProps<TResponseData = null> {
  isSuccess: boolean;
  message: string;
  data?: TResponseData;
}
