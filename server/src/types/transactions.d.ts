import { Identifier } from "./global";

namespace TransactionTypes {
  type TransactionId = { transactionId: mongoose.Types.ObjectId };
  export namespace Global {
    export interface TransactionDetails {
      _id: mongoose.Types.ObjectId;
      accountId: mongoose.Types.ObjectId;
      belongsToUser: mongoose.Types.ObjectId;
      transactionType: "inc" | "exp";
      transactionDescription: string;
      transactionDateTime: string;
      transactionValue: number;
    }
  }
  export namespace Repository {
    export type FindTransactionByAccountIdParams = Identifier & Pick<Global.TransactionDetails, "accountId">;
    export type FindTransactionByIdParams = Identifier & TransactionId;
    export type FindTransactionsByUserIdParams = Identifier;
    export type CreateTransactionParams = Omit<Global.TransactionDetails, "_id">;
    export type UpdateTransactionParams = Identifier &
      Omit<Omit<Global.TransactionDetails, "_id">, "belongsToUser"> &
      TransactionId;
    export type DeleteTransactionParams = Identifier & TransactionId;
  }
  export namespace Service {
    export type GetTransactionsParams = Identifier;
    export type CreateTransactionParams = Identifier & Omit<Omit<Global.TransactionDetails, "_id">, "belongsToUser">;
    export type UpdateTransactionParams = Identifier &
      Omit<Omit<Global.TransactionDetails, "_id">, "belongsToUser"> &
      TransactionId;
    export type DeleteTransactionParams = Identifier & TransactionId;
  }
  export namespace Controller {
    export type GetTransactionsParams = Identifier;
    export type CreateTransactionParams = Identifier & Omit<Omit<Global.TransactionDetails, "_id">, "belongsToUser">;
    export type UpdateTransactionParams = Identifier &
      Omit<Omit<Global.TransactionDetails, "_id">, "belongsToUser"> &
      TransactionId;
    export type DeleteTransactionParams = Identifier & TransactionId;
  }
}

export default TransactionTypes;
