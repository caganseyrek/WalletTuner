import GlobalTypes from "./globals";

namespace TransactionTypes {
  export type TransactionType = "inc" | "exp";
  type TransactionId = { transactionId: string };
  type MaybeTransactionId = { transactionId?: string };
  interface Transaction {
    accountId: string;
    transactionType: TransactionType;
    transactionDescription: string;
    transactionDateTime: string;
    transactionValue: number;
  }

  export namespace Mutations {
    export type CreateRequestParams = Transaction;
    export type UpdateRequestParams = TransactionId & Transaction;
    export type DeleteRequestParams = TransactionId;
  }

  export namespace Queries {
    export type TransactionQueryRequestProps = MaybeTransactionId;
  }
}

export default TransactionTypes;
