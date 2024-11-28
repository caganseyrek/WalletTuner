import GlobalTypes from "./globals";

namespace TransactionTypes {
  export namespace Mutations {
    export interface CreateRequestParams extends GlobalTypes.EssentialRequestParams {
      accountId: string;
      transactionType: "inc" | "exp";
      transactionDescription: string;
      transactionDateTime: string;
      transactionValue: number;
    }

    export interface UpdateRequestParams extends GlobalTypes.EssentialRequestParams {
      accountId: string;
      transactionType: "inc" | "exp";
      transactionDescription: string;
      transactionDateTime: string;
      transactionValue: number;
    }

    export interface DeleteRequestParams extends GlobalTypes.EssentialRequestParams {
      transactionId: string;
    }
  }

  export namespace Queries {
    export type TransactionQueryRequestProps = GlobalTypes.EssentialRequestParams;
    export interface TransactionQueryResponseProps {
      _id: string;
      accountId: string;
      belongsToUser: string;
      transactionType: "inc" | "exp";
      transactionDescription: string;
      transactionDateTime: string;
      transactionValue: number;
    }
  }
}

export default TransactionTypes;
