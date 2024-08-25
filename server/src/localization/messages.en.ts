export const statusMessages = {
  badrequest: "There was an error processing your request, please try again.",
  internalerror: "There was a server error, please try again later.",
  unauthorized: "You do not have access to do this.",
  custom: {
    expiredToken: "Expired Token",
  },
};

export const middlewareMessages = {
  validateAccount: {
    noAccountFound: "Requested account could not be found.",
  },
  validateTransaction: {
    noTransactionFound: "Requested transaction could not be found.",
  },
  validateUser: {
    invalidUserId: "UserId is invalid. Please re-login.",
  },
};

export const accountMessages = {
  getAccounts: {
    noAccountsFound: "Could not find any accounts.",
  },
  getAccountsById: {
    noAccountsFound: "Could not get the details of this accounts.",
  },
  createAccount: {
    creationSuccessful: "Successfully created new account.",
  },
  deleteAccount: {
    deletionSuccessful: "Successfully deleted account.",
  },
  updateAccount: {
    updateSuccessful: "Successfully updated account.",
  },
};

export const transactionMessages = {
  getTransactions: {
    noTransactionsFound: "Could not find any transactions with the given filters.",
  },
  getTransactionsById: {
    noTransactionsFound: "Could not get the details of this transaction.",
  },
  getTransactionsByAcc: {
    noTransactionsFound: "Could not find any transactions with the given filters.",
  },
  createTransaction: {
    creationSuccessfull: "Successfully created new transaction",
  },
  deleteTransaction: {
    deletionSuccessful: "Successfully deleted selected transaction",
  },
  updateTransaction: {
    updateSuccessful: "Successfully updated selected transaction",
  },
};

export const userMessages = {
  login: {
    loginSuccessful: "Successfully logged in.",
    wrongEmailOrPassword: "Wrong e-mail or password.",
  },
  deleteUser: {
    deleteSuccessful: "User deleted successfully.",
    passwordValidationFail: "Your password is not correct.",
  },
  logout: {
    logoutSuccessful: "Successfully logged out.",
  },
  register: {
    userExists: "There was an error creating a new user.",
    registerSuccessful: "Successfully created new user.",
  },
  resetpw: {
    passwordValidationFail: "Your password is not correct.",
    expiredRefreshToken: "You need to re-login to do this.",
    resetpwSuccessful: "Password successfully reset.",
  },
  updateUser: {
    passwordValidationFail: "Your password is not correct.",
    updateFailed: "There was an error updating account details.",
    updateSuccessful: "Successfully updated account details.",
  },
};

export const tokenMessages = {
  noRefreshTokenReceived: "You need to re-login to do this.",
  noRefreshTokenFound: "You need to re-login to do this.",
  refreshTokenExpired: "You need to re-login to do this.",
  invalidRefreshToken: "You need to re-login to do this.",
};

export const errorMessage = (
  errorLocation: string,
  errorPosition: string,
  errorMessage?: unknown,
  isMiddleware?: boolean,
) => {
  return `There was an error in '${errorLocation}' ${isMiddleware && "middleware"} at the ${errorPosition}${errorMessage && ": " + errorMessage}.`;
};
