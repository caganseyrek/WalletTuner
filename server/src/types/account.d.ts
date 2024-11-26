import { Identifier } from "./global";

namespace AccountTypes {
  type AccountId = { accountId: mongoose.Types.ObjectId };
  type AccountName = { accountName: string };
  export namespace Global {
    export interface AccountDetails {
      _id: mongoose.Types.ObjectId;
      belongsToUser: mongoose.Types.ObjectId;
      accountName: string;
      createdAt: string;
      balance: number;
      totalIncome: number;
      totalExpense: number;
    }
    export interface AccountBalanceDetails {
      balance: number;
      totalIncome: number;
      totalExpense: number;
    }
  }
  export namespace Repository {
    export type FindAccountByNameParams = Identifier & AccountName;
    export type FindAccountByIdParams = Identifier & AccountId;
    export type FindAccountByUserIdParams = Identifier;
    export type CreateAccountParams = Identifier & AccountName;
    export type UpdateAccountParams = Identifier &
      Omit<Omit<Global.AccountDetails, "_id">, "belongsToUser"> &
      AccountId;
    export type DeleteAccountParams = Identifier & AccountId;
  }
  export namespace Services {
    export type GetAccountsParams = Identifier;
    export type CreateAccountParams = Identifier & Pick<Global.AccountDetails, "accountName">;
    export type UpdateAccountParams = Identifier & AccountId & AccountName;
    export type DeleteAccountParams = Identifier & AccountId;
  }
  export namespace Controller {
    export type GetAccountsParams = Identifier;
    export type CreateAccountParams = Identifier & Pick<Global.AccountDetails, "accountName">;
    export type UpdateAccountParams = Identifier & AccountId & AccountName;
    export type DeleteAccountParams = Identifier & AccountId;
  }
}

export default AccountTypes;
