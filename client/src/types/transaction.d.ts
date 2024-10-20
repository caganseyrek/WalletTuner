declare interface TransactionQueryRequestProps extends EssentialRequestProps {}

declare interface TransactionCreateRequestProps extends EssentialRequestProps {
  accountId: string;
  transactionType: "inc" | "exp";
  transactionDescription: string;
  transactionDateTime: string;
  transactionValue: number;
}

declare interface TransactionUpdateRequestProps extends EssentialRequestProps {
  accountId: string;
  transactionType: "inc" | "exp";
  transactionDescription: string;
  transactionDateTime: string;
  transactionValue: number;
}

declare interface TransactionDeleteRequestProps extends EssentialRequestProps {
  transactionId: string;
}

declare interface TransactionQueryResponseProps {
  _id: string;
  accountId: string;
  belongsToUser: string;
  transactionType: "inc" | "exp";
  transactionDescription: string;
  transactionDateTime: string;
  transactionValue: number;
}
