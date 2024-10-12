declare interface AuthCheckProps {
  children: ReactNode;
}

interface LoadLanguageProps {
  children: ReactNode;
}

declare interface DataStateProps {
  snackbarState?: {
    isOpen: boolean;
    message: string;
  };
  isLoading: boolean;
  isSuccess: boolean;
}
