declare interface LogoutRequestProps extends EssentialRequestProps {}

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

declare interface TransactionQueryRequestProps extends EssentialRequestProps {}

declare interface TransactionCreateRequestProps extends EssentialRequestProps {
  belongsToAccount: string;
  transactionType: "income" | "expense";
  transactionDescription: string;
  transactionDatetime: string;
  transactionValue: number;
}

declare interface TransactionUpdateRequestProps extends EssentialRequestProps {
  belongsToAccount: string;
  transactionType: "income" | "expense";
  transactionDescription: string;
  transactionDatetime: string;
  transactionValue: number;
}

declare interface TransactionDeleteRequestProps extends EssentialRequestProps {
  transactionId: string;
}

declare interface TransactionQueryResponseProps {
  _id: string;
  belongsToAccount: string;
  belongsToUser: string;
  transactionType: string;
  transactionDescription: string;
  transactionDatetime: string;
  transactionValue: string;
}

declare interface MessageResponseProps {
  message: string;
}
