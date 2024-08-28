declare interface StatusProps {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

declare interface FormHeaderProps {
  children: ReactNode;
  title: string;
}
