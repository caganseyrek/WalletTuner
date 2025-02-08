import { Account, Globals } from "@wallettuner/resource-types";
import { NextFunction, Request, Response } from "express";

import AccountService from "@/resources/account/account.service";

import Converter from "@/utils/converter";

import ResponseHelper from "@/helpers/responseHelper";

import STATUS_CODES from "@/constants/statusCodes";

class AccountController {
  private accountService: AccountService;

  constructor() {
    this.accountService = new AccountService();
  }

  public async getAccounts(req: Request, res: Response, next: NextFunction) {
    try {
      const params: Globals.UserIdFromCookie = req.body;
      const accounts: Account.AccountProps[] = await this.accountService.getAccounts({
        user_id: Converter.toObjectId(params.user_id),
      });
      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.createResponse({
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
      const params: Account.Controller.CreateProps = req.body;
      await this.accountService.createAccount({
        user_id: Converter.toObjectId(params.user_id),
        name: params.name,
      });
      return res.status(STATUS_CODES.created.code).json(
        ResponseHelper.createResponse({
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
      const params: Account.Controller.UpdateProps = req.body;
      await this.accountService.updateAccount({
        _id: Converter.toObjectId(params._id),
        user_id: Converter.toObjectId(params.user_id),
        name: params.name,
      });
      return res.status(STATUS_CODES.created.code).json(
        ResponseHelper.createResponse({
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
      const params: Account.Controller.DeleteProps = req.body;
      await this.accountService.deleteAccount({
        _id: Converter.toObjectId(params._id),
        user_id: Converter.toObjectId(params.user_id),
      });
      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.createResponse({
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
