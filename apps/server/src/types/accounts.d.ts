import { GlobalTypes } from "./globals";

namespace AccountTypes {
  type AccountId = { accountId: mongoose.Types.ObjectId };
  type AccountName = { accountName: string };
  export interface AccountObject {
    _id: mongoose.Types.ObjectId;
    belongsToUser: mongoose.Types.ObjectId;
    accountName: string;
    createdAt: string;
    balance: number;
    totalIncome: number;
    totalExpense: number;
  }
  export interface AccountBalanceObject {
    balance: number;
    totalIncome: number;
    totalExpense: number;
  }
  export namespace Repository {
    export type FindAccountByNameParams = GlobalTypes.Identifiers & AccountName;
    export type FindAccountByIdParams = GlobalTypes.Identifiers & AccountId;
    export type FindAccountByUserIdParams = GlobalTypes.Identifiers;
    export type CreateAccountParams = GlobalTypes.Identifiers & AccountName;
    export type UpdateAccountParams = GlobalTypes.Identifiers &
      Omit<Omit<AccountObject, "_id">, "belongsToUser"> &
      AccountId;
    export type DeleteAccountParams = GlobalTypes.Identifiers & AccountId;
  }
  export namespace Service {
    export type GetAccountsParams = GlobalTypes.Identifiers;
    export type CreateAccountParams = GlobalTypes.Identifiers &
      GlobalTypes.Identifiers &
      Pick<AccountObject, "accountName">;
    export type UpdateAccountParams = GlobalTypes.Identifiers & AccountId & AccountName;
    export type DeleteAccountParams = GlobalTypes.Identifiers & AccountId;
  }
  export namespace Controller {
    export type CreateAccountParams = Pick<AccountObject, "accountName">;
    export type UpdateAccountParams = AccountId & AccountName;
    export type DeleteAccountParams = AccountId;
  }
}

export default AccountTypes;
