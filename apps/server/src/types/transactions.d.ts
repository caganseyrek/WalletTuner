import { GlobalTypes } from "./globals";

namespace TransactionTypes {
  type TransactionId = { transactionId: mongoose.Types.ObjectId };
  type TransactionTypes = "inc" | "exp";
  export interface TransactionObject {
    _id: mongoose.Types.ObjectId;
    accountId: mongoose.Types.ObjectId;
    belongsToUser: mongoose.Types.ObjectId;
    transactionType: TransactionTypes;
    transactionDescription: string;
    transactionDateTime: string;
    transactionValue: number;
  }
  export namespace Repository {
    export type FindTransactionByIdParams = GlobalTypes.Identifiers & TransactionId;
    export type FindTransactionsByAccountIdParams = GlobalTypes.Identifiers & Pick<TransactionObject, "accountId">;
    export type FindTransactionsByUserIdParams = GlobalTypes.Identifiers;
    export type CreateTransactionParams = Omit<TransactionObject, "_id">;
    export type UpdateTransactionParams = GlobalTypes.Identifiers &
      Omit<Omit<TransactionObject, "_id">, "belongsToUser"> &
      TransactionId;
    export type DeleteTransactionParams = GlobalTypes.Identifiers & TransactionId;
  }
  export namespace Service {
    export type GetTransactionsParams = GlobalTypes.Identifiers;
    export type CreateTransactionParams = GlobalTypes.Identifiers &
      Omit<Omit<TransactionObject, "_id">, "belongsToUser">;
    export type UpdateTransactionParams = GlobalTypes.Identifiers &
      Omit<Omit<TransactionObject, "_id">, "belongsToUser"> &
      TransactionId;
    export type DeleteTransactionParams = GlobalTypes.Identifiers & TransactionId;
  }
  export namespace Controller {
    export type CreateTransactionParams = Omit<Omit<TransactionObject, "_id">, "belongsToUser">;
    export type UpdateTransactionParams = Omit<Omit<TransactionObject, "_id">, "belongsToUser"> & TransactionId;
    export type DeleteTransactionParams = TransactionId;
  }
}

export default TransactionTypes;
