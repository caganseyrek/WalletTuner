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
