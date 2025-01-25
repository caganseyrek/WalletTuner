import TransactionTypes from "./transactions";

export namespace UtilsTypes {
  export namespace TokenHelper {
    type TokenType = { tokenType: "access" | "refresh" };
    export type GenerateParams = { payload: object | string } & TokenType;
    export type VerifyParams = { tokenValue: string } & TokenType;
  }
  export namespace PasswordHelper {
    export type HashParams = { password: string };
    export type CompareParams = { enteredPassword: string; hashedPassword: string };
  }
  export namespace BalanceHelper {
    export interface UpdateBalanceParams {
      originalTransactionValue: number;
      updatedTransactionValue: number;
      originalTransactionType: TransactionTypes;
      updatedTransactionType: TransactionTypes;
      currentBalance: number;
      currentTotalIncome: number;
      currentTotalExpense: number;
    }
    export interface UpdatedBalancesParams {
      newAccountBalance: number;
      newTotalIncome: number;
      newTotalExpense: number;
    }
    export interface TransactionDetailsParams {
      transactionType: TransactionTypes;
      transactionValue: number;
      balance: number;
      totalIncome: number;
      totalExpense: number;
    }
  }
  export namespace ConfigTypes {
    type NODE_ENV_TYPE = "development" | "production" | "test";
    export interface EnvProps {
      NODE_ENV: NODE_ENV_TYPE;
      SERVER_PORT: string;
      SECRETS: { JWT_ACCESS: string; JWT_REFRESH: string; COOKIE: string };
      DATABASE: { URI_START: string; URI_END: string };
      CLIENT_URL: string;
    }
  }
}
