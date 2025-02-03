import { NextFunction, Request, Response } from "express";

import AccountTypes from "@/types/accounts";

import ResponseHelper from "@/app/response";
import STATUS_CODES from "@/constants/statusCodes";
import TokenHelper from "@/helpers/tokenHelper";
import AccountService from "@/resources/account/service";

class AccountController {
  private accountService: AccountService;

  constructor() {
    this.accountService = new AccountService();
  }

  public async getAccounts(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken } = req.cookies;
      const userId: string = TokenHelper.extractUserId({ tokenValue: accessToken, tokenType: "access" });

      const accounts: AccountTypes.AccountObject[] = await this.accountService.getAccounts({ userId: userId });

      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.generate({
          isSuccess: true,
          message: "",
          data: accounts,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async createAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken } = req.cookies;
      const userId: string = TokenHelper.extractUserId({ tokenValue: accessToken, tokenType: "access" });

      const { accountName }: AccountTypes.Controller.CreateAccountParams = req.body;
      await this.accountService.createAccount({ userId: userId, accountName: accountName });

      return res.status(STATUS_CODES.created.code).json(
        ResponseHelper.generate({
          isSuccess: true,
          message: "account.success.creationSuccessful",
          data: null,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async updateAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken } = req.cookies;
      const userId: string = TokenHelper.extractUserId({ tokenValue: accessToken, tokenType: "access" });

      const { accountId, accountName }: AccountTypes.Controller.UpdateAccountParams = req.body;
      await this.accountService.updateAccount({ userId: userId, accountId: accountId, accountName: accountName });

      return res.status(STATUS_CODES.created.code).json(
        ResponseHelper.generate({
          isSuccess: true,
          message: "account.success.updateSuccessful",
          data: null,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async deleteAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken } = req.cookies;
      const userId: string = TokenHelper.extractUserId({ tokenValue: accessToken, tokenType: "access" });

      const { accountId }: AccountTypes.Controller.DeleteAccountParams = req.body;
      await this.accountService.deleteAccount({ userId: userId, accountId: accountId });

      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.generate({
          isSuccess: false,
          message: "account.success.deletionSuccessful",
          data: null,
        }),
      );
    } catch (error) {
      next(error);
    }
  }
}

export default AccountController;
