export const statusMessages = {
  badrequest: "There was an error processing your request, please try again.",
  internalerror: "There was a server error, please try again later.",
  unauthorized: "You do not have access to do this.",
};

export const controllerMessages = {
  user: {
    login: {
      loginSuccessful: "Successfully logged in.",
      wrongEmailOrPassword: "Wrong e-mail or password.",
    },
    deleteUser: {
      deleteSuccessful: "User deleted successfully.",
      passwordValidationFail: "Your password is not correct.",
    },
    logout: {
      logoutSuccessful: "Successfully logged out",
    },
    register: {
      userExists: "There was an error creating a new account.",
      registerSuccessful: "Successfully created new account",
    },
    resetpw: {
      passwordValidationFail: "Your password is not correct.",
      expiredRefreshToken: "You need to re-login to do this.",
      resetpwSuccessful: "Password successfully reset.",
    },
    updateUser: {
      passwordValidationFail: "Your password is not correct.",
      updateFailed: "There was an error updating account details",
      updateSuccessful: "Successfully updated account details",
    },
  },
  token: {
    newToken: {
      refreshTokenExpired: "You need to re-login to do this.",
    },
  },
};

export const controllerError = (
  controllerName: string,
  errorPosition: string,
  errorMessage?: unknown,
) => {
  return `There was an error in '${controllerName}' at the ${errorPosition}${errorMessage && ": " + errorMessage}`;
};
