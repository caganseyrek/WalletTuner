namespace PageTypes {
  export interface AccountDataRowParams {
    id: number;
    uniqueId: string;
    accountName: string;
    balance: number;
    createdAt: string;
  }

  export interface TransactionDataRowProps {
    id: number;
    uniqueId: string;
    accountId: string;
    transactionType: "inc" | "exp";
    transactionDescription: string;
    transactionDateTime: string;
    transactionValue: number;
  }
}

export default PageTypes;
