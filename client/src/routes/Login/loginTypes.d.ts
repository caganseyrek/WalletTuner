declare interface LoginRequestProps {
  email: string;
  password: string;
}

declare interface LoginResponseProps {
  message: string;
  accessToken: string;
  currentUser: string;
  currentEmail: string;
  name: string;
}

interface SettingsRequestProps extends EssentialRequestProps {}
