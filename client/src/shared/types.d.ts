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

declare interface SettingsResponseProps {
  preferredCurrency: string | undefined;
  preferredCurrencyDisplayType: string | undefined;
  preferredCurrencyDisplayPosition: string | undefined;
  preferredCurrencyDisplaySpacing: string | undefined;
  preferredCurrencyThousandSeperator: string | undefined;
  preferredCurrencyDecimalSeperator: string | undefined;
}

/* forms */
declare interface StatusProps {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

/* Components */
declare interface AuthCheckProps {
  children: ReactNode;
}

declare interface FormHeaderProps {
  title: string;
}

declare interface SnackbarStateProps {
  isOpen: boolean;
  message: string;
}

declare interface SubmitButtonProps {
  status: StatusProps;
}
