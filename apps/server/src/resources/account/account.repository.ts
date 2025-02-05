import mongoose from "mongoose";

import { InternalError } from "@/app/error";

import accountModel from "@/resources/account/account.model";

import logger from "@/utils/logger";
import Sanitizer from "@/utils/sanitizer";

import { Account } from "./account.types";

class AccountRepository {
  public async findByName(params: Account.FindByNameProps): Promise<Account.AccountProps | null> {
    const sanitizedQuery = Sanitizer.sanitizeQuery<Account.FindByNameProps>({
      user_id: params.user_id,
      name: params.name,
    });
    const accounts: Account.AccountProps | null = await accountModel.findOne(sanitizedQuery).exec();
    return accounts;
  }

  public async findById(params: Account.FindByIdProps): Promise<Account.AccountProps | null> {
    const sanitizedQuery = Sanitizer.sanitizeQuery<Account.FindByIdProps>({
      _id: params._id,
      user_id: params.user_id,
    });
    const accounts: Account.AccountProps | null = await accountModel.findOne(sanitizedQuery).exec();
    return accounts;
  }

  public async findByUserId(params: Account.FindByUserIdProps): Promise<Account.AccountProps[]> {
    const sanitizedQuery = Sanitizer.sanitizeQuery<Account.FindByUserIdProps>({
      user_id: params.user_id,
    });
    const accounts: Account.AccountProps[] = await accountModel.find(sanitizedQuery).exec();
    return accounts;
  }

  public async createAccount(params: Account.Repository.CreateProps): Promise<void> {
    const sanitizedNewAccountObject = Sanitizer.sanitize<Account.AccountProps>({
      _id: new mongoose.Types.ObjectId(),
      user_id: params.user_id,
      name: params.name,
      balance: 0,
      total_income: 0,
      total_expense: 0,
      created_at: new Date().toISOString(),
    });
    const newAccountObject = new accountModel<Account.AccountProps>(sanitizedNewAccountObject);
    const saveNewAccount = await newAccountObject.save();
    if (!saveNewAccount) {
      logger.error(`An error occured while saving a new account that belongs to user id ${params.user_id}`);
      throw new InternalError();
    }
  }

  public async updateAccount(params: Account.Repository.UpdateProps): Promise<void> {
    const sanitizedAccountId = Sanitizer.sanitize<mongoose.Types.ObjectId>(params._id);
    const sanitizedAccountModel = Sanitizer.sanitize<Omit<Account.AccountProps, "_id">>({
      user_id: params.user_id,
      name: params.name,
      balance: params.balance,
      total_income: params.total_income,
      total_expense: params.total_expense,
      created_at: params.created_at,
    });
    const updateAccount = await accountModel.findByIdAndUpdate(sanitizedAccountId, { ...sanitizedAccountModel }).exec();
    if (!updateAccount) {
      logger.error(`An error occured while updating an account with id ${params._id}`);
      throw new InternalError();
    }
  }

  public async deleteAccount(params: Account.Repository.DeleteProps): Promise<void> {
    const sanitizedQuery = Sanitizer.sanitizeQuery<Account.Repository.DeleteProps>({
      _id: params._id,
      user_id: params.user_id,
    });
    const deleteAccount = await accountModel.findOneAndDelete(sanitizedQuery).exec();
    if (!deleteAccount) {
      logger.error(`An error occured while deleting an account with id ${params._id}`);
      throw new InternalError();
    }
  }
}

export default AccountRepository;
