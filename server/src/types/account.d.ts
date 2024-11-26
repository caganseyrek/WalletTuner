import { Identifier } from "./global";

namespace AccountTypes {
  export interface AccountDetails {
    _id: mongoose.Types.ObjectId;
    belongsToUser: mongoose.Types.ObjectId;
    accountName: string;
    createdAt: string;
    balance: number;
    totalIncome: number;
    totalExpense: number;
  }

  type AccountRequestProps = { accountId: mongoose.Types.ObjectId; accountName: string };

  export type CreateParams = Identifier & Omit<AccountRequestProps, "accountId">;
  export type UpdateParams = Identifier & AccountRequestProps;
  export type DeleteParams = Identifier & Omit<AccountRequestProps, "accountName">;
}

export default AccountTypes;
