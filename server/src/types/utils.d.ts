export namespace TokenHelperTypes {
  type TokenType = "access" | "refresh";

  export interface GenerateParams {
    payload: object | string;
    tokenType: TokenType;
  }

  export interface VerifyParams {
    tokenValue: string;
    tokenType: TokenType;
  }
}

export namespace PasswordHelperTypes {
  export interface HashParams {
    password: string;
  }

  export interface CompareParams {
    enteredPassword: string;
    hashedPassword: string;
  }
}

export namespace BalanceHelperTypes {
  export interface UpdateBalanceParams {
    originalTransactionValue: number;
    updatedTransactionValue: number;
    originalTransactionType: "inc" | "exp";
    updatedTransactionType: "inc" | "exp";
    currentBalance: number;
    currentTotalIncome: number;
    currentTotalExpense: number;
  }
  export interface SubtractDeletedTransactionValueParams {
    transactionType: "inc" | "exp";
    transactionValue: number;
    balance: number;
    totalIncome: number;
    totalExpense: number;
  }
  export interface AddNewTransactionValueParams {
    transactionType: "inc" | "exp";
    transactionValue: number;
    balance: number;
    totalIncome: number;
    totalExpense: number;
  }
  export interface UpdatedBalances {
    newAccountBalance: number;
    newTotalIncome: number;
    newTotalExpense: number;
  }
}

export interface ResponseParameters {
  isSuccess: boolean;
  message: string;
  data: object | null;
}
