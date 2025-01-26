import TransactionTypes from "@/types/transaction";

export interface TransactionObject {
  _id: string;
  accountId: string;
  transactionType: TransactionTypes.TransactionType;
  transactionDescription: string;
  transactionDateTime: string;
  transactionValue: number;
}
