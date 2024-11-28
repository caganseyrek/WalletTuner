import GlobalTypes from "./globals";

namespace AccountHooksTypes {
  type AccountName = { accountName: string };

  export namespace Mutations {
    export type CreateRequestParams = GlobalTypes.EssentialRequestParams & AccountName;
    export type UpdateRequestParams = GlobalTypes.EssentialRequestParams & AccountName;
    export type DeleteRequestParams = GlobalTypes.EssentialRequestParams & { accountId: string };
  }

  export namespace Queries {
    export type RequestParams = GlobalTypes.EssentialRequestParams & { accountId?: string };
    export interface ResponseProps {
      _id: string;
      accountName: string;
      createdAt: string;
      balance: number;
      totalIncome: number;
      totalExpense: number;
    }
  }
}

export default AccountHooksTypes;
