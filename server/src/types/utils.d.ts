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

export interface ResponseParameters {
  isSuccess: boolean;
  message: string;
  data: object | null;
}
