import { Identifier } from "./global";

namespace TransactionTypes {
  export interface TransactionDetails {
    _id: mongoose.Types.ObjectId;
    accountId: mongoose.Types.ObjectId;
    belongsToUser: mongoose.Types.ObjectId;
    transactionType: "inc" | "exp";
    transactionDescription: string;
    transactionDateTime: string;
    transactionValue: number;
  }

  type TransactionId = { transactionId: mongoose.Types.ObjectId };

  export type CreateParams = Identifier & TransactionDetails;
  export type UpdateParams = Identifier & TransactionDetails & TransactionId;
  export type DeleteParams = Identifier & TransactionId;
}

export default TransactionTypes;
