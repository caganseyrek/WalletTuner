declare interface LogoutRequestProps extends EssentialRequestProps {}

declare interface AccountQueryRequestProps extends EssentialRequestProps {
  accountId?: string;
}

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

declare interface AccountQueryResponseProps {
  _id: string;
  name: string;
  createdAt: string;
  balance: number;
  monthlyIncome: number;
  monthlyExpense: number;
}

declare interface MessageResponseProps {
  message: string;
}
