import { NextFunction, Request, Response } from "express";

import AccountService from "@/services/accountService";

import generateResponse from "@/utils/responseHandler";
import statusCodes from "@/utils/statusCodes";

import AccountTypes from "@/types/account";

const accountService = new AccountService();

async function getAccounts(req: Request, res: Response, next: NextFunction) {
  try {
    const { currentUser }: AccountTypes.Controller.GetAccountsParams = req.body;
    const accounts: AccountTypes.Global.AccountDetails[] = await accountService.getAccounts({
      currentUser: currentUser,
    });
    return res.status(statusCodes.success).json(
      generateResponse({
        isSuccess: true,
        message: "",
        data: accounts,
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function createAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const { currentUser, accountName }: AccountTypes.Controller.CreateAccountParams = req.body;
    await accountService.createAccount({
      currentUser: currentUser,
      accountName: accountName,
    });
    return res.status(statusCodes.created).json(
      generateResponse({
        isSuccess: true,
        message: req.t("account.success.creationSuccessful"),
        data: null,
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function updateAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const { currentUser, accountId, accountName }: AccountTypes.Controller.UpdateAccountParams = req.body;
    await accountService.updateAccount({
      currentUser: currentUser,
      accountId: accountId,
      accountName: accountName,
    });
    return res.status(statusCodes.created).json(
      generateResponse({
        isSuccess: true,
        message: req.t("account.success.updateSuccessful"),
        data: null,
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function deleteAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const { currentUser, accountId }: AccountTypes.Controller.DeleteAccountParams = req.body;
    await accountService.deleteAccount({
      currentUser: currentUser,
      accountId: accountId,
    });
    return res.status(statusCodes.success).json(
      generateResponse({
        isSuccess: true,
        message: req.t("account.success.deletionSuccessful"),
        data: null,
      }),
    );
  } catch (error) {
    next(error);
  }
}

export default { getAccounts, createAccount, updateAccount, deleteAccount };
