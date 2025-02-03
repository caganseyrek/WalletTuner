namespace AccountHooksTypes {
  type AccountName = { accountName: string };
  type AccountId = { accountId: string };
  type MaybeAccountId = { accountId?: string };

  export namespace Mutations {
    export type CreateRequestParams = AccountName;
    export type UpdateRequestParams = AccountName;
    export type DeleteRequestParams = AccountId;
  }

  export namespace Queries {
    export type RequestParams = MaybeAccountId;
  }
}

export default AccountHooksTypes;
