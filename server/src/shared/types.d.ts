export interface IdentifierProps {
  currentUser: string;
}

export interface TransactionProps {
  _id: mongoose.Types.ObjectId;
  accountId: mongoose.Types.ObjectId;
  belongsToUser: mongoose.Types.ObjectId;
  transactionType: "inc" | "exp";
  transactionDescription: string;
  transactionDateTime: string;
  transactionValue: number;
}

export interface AccountProps {
  _id: mongoose.Types.ObjectId;
  belongsToUser: mongoose.Types.ObjectId;
  accountName: string;
  createdAt: string;
  balance: number;
  totalIncome: number;
  totalExpense: number;
}

export interface UserProps {
  _id: mongoose.Types.ObjectId;
  name: string;
  surname: string;
  email: string;
  password: string;
  preferredFormat: string;
  preferredCurrency: string;
  preferredCurrencyDisplay: string;
}

export interface TokenProps {
  _id: mongoose.Types.ObjectId;
  refreshToken: string;
  belongsTo: mongoose.Types.ObjectId;
}

type TransactionIdProps = { transactionId: mongoose.Types.ObjectId };
type RefreshTokenProps = { refreshToken: string };
type AccountRequestProps = {
  accountId: mongoose.Types.ObjectId;
  accountName: string;
};
type ResetPasswordRequestProps = {
  oldpassword: string;
  newpassword: string;
};

export type DeleteUserProps = IdentifierProps & Pick<UserProps, "password">;
export type LoginProps = Pick<UserProps, "email"> & Pick<UserProps, "password">;
export type RegisterProps = Omit<
  UserProps,
  "_id" | "preferredFormat" | "preferredCurrency" | "preferredCurrencyDisplay"
>;
export type UpdateUserProps = IdentifierProps &
  Omit<UserProps, "_id" | "preferredFormat" | "preferredCurrency" | "preferredCurrencyDisplay">;
export type ResetPasswordProps = IdentifierProps & ResetPasswordRequestProps;

export type CreateTransactionProps = IdentifierProps & TransactionProps;
export type UpdateTransactionProps = IdentifierProps & TransactionProps & TransactionIdProps;
export type DeleteTransactionProps = IdentifierProps & TransactionIdProps;

export type CreateAccountProps = IdentifierProps & Omit<AccountRequestProps, "accountId">;
export type UpdateAccountProps = IdentifierProps & AccountRequestProps;
export type DeleteAccountProps = IdentifierProps & Omit<AccountRequestProps, "accountName">;

export type NewTokenProps = IdentifierProps & RefreshTokenProps;
