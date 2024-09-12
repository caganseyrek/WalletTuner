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

declare interface LogoutRequestProps extends EssentialRequestProps {}

declare interface SettingsRequestProps extends EssentialRequestProps {}

declare interface SettingsResponseProps {
  preferredCurrency: string | undefined;
  preferredCurrencyDisplayType: string | undefined;
  preferredCurrencyDisplayPosition: string | undefined;
  preferredCurrencyDisplaySpacing: string | undefined;
  preferredCurrencyThousandSeperator: string | undefined;
  preferredCurrencyDecimalSeperator: string | undefined;
}

interface RegisterRequestProps {
  name: string;
  surname: string;
  email: string;
  password: string;
}
