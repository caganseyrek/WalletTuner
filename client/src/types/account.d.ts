declare interface AccountQueryRequestProps extends EssentialRequestProps {
  accountId?: string;
}

declare interface AccountCreateRequestProps extends EssentialRequestProps {
  accountName: string;
}

declare interface AccountUpdateRequestProps extends EssentialRequestProps {
  accountName: string;
}

declare interface AccountDeleteRequestProps extends EssentialRequestProps {
  accountId: string;
}

declare interface AccountQueryResponseProps {
  _id: string;
  accountName: string;
  createdAt: string;
  balance: number;
  monthlyIncome: number;
  monthlyExpense: number;
}
