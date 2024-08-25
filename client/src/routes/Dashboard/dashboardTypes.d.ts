declare interface LogoutRequestProps extends EssentialRequestProps {}

declare interface AccountCreateRequestProps extends EssentialRequestProps {
  belongsToUser: string;
  name: string;
}

declare interface AccountUpdateRequestProps extends EssentialRequestProps {
  name: string;
}

declare interface AccountDeleteRequestProps extends EssentialRequestProps {
  accountId: string;
}

declare interface MessageResponseProps {
  message: string;
}
