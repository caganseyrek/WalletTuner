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

declare interface MessageResponseProps {
  message: string;
}

declare interface StatusProps {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}
