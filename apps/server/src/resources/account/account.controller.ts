import { NextFunction, Request, Response } from "express";

import ResponseHelper from "@/app/response";

import AccountService from "@/resources/account/account.service";

import STATUS_CODES from "@/constants/statusCodes";

import { Account } from "./account.types";

class AccountController {
  private accountService: AccountService;

  constructor() {
    this.accountService = new AccountService();
  }

  public async getAccounts(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id: string = req.cookies.user_id;
      const accounts: Account.AccountProps[] = await this.accountService.getAccounts({
        user_id: user_id,
      });
      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.response({
          isSuccess: true,
          responseMessage: "",
          data: accounts,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async createAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id: string = req.cookies.user_id;
      const params: Account.Controller.CreateProps = req.body;
      await this.accountService.createAccount({ user_id: user_id, name: params.name });
      return res.status(STATUS_CODES.created.code).json(
        ResponseHelper.response({
          isSuccess: true,
          responseMessage: "",
          data: null,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async updateAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id: string = req.cookies.user_id;
      const params: Account.Controller.UpdateProps = req.body;
      await this.accountService.updateAccount({
        _id: params._id,
        user_id: user_id,
        name: params.name,
      });
      return res.status(STATUS_CODES.created.code).json(
        ResponseHelper.response({
          isSuccess: true,
          responseMessage: "",
          data: null,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async deleteAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id: string = req.cookies.user_id;
      const params: Account.Controller.DeleteProps = req.body;
      await this.accountService.deleteAccount({ _id: params._id, user_id: user_id });
      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.response({
          isSuccess: false,
          responseMessage: "",
          data: null,
        }),
      );
    } catch (error) {
      next(error);
    }
  }
}

export default AccountController;
