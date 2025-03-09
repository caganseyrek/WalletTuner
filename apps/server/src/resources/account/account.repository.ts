import { Account } from "@wallettuner/resource-types";
import mongoose from "mongoose";

import { InternalError } from "@/app/error/errors";

import accountModel from "@/resources/account/account.model";

import logger from "@/utils/logger";

class AccountRepository {
  public async findByName(params: Account.FindByNameProps): Promise<Account.AccountProps | null> {
    const accounts: Account.AccountProps | null = await accountModel
      .findOne({ user_id: params.user_id, name: params.name })
      .exec();
    return accounts;
  }

  public async findById(params: Account.FindByIdProps): Promise<Account.AccountProps | null> {
    const accounts: Account.AccountProps | null = await accountModel
      .findOne({ _id: params._id, user_id: params.user_id })
      .exec();
    return accounts;
  }

  public async findByUserId(params: Account.FindByUserIdProps): Promise<Account.AccountProps[]> {
    const accounts: Account.AccountProps[] = await accountModel.find({ user_id: params.user_id }).exec();
    return accounts;
  }

  public async createAccount(params: Account.Repository.CreateProps): Promise<void> {
    const newAccountObject = new accountModel<Account.AccountProps>({
      _id: new mongoose.Types.ObjectId(),
      user_id: params.user_id,
      name: params.name,
      balance: 0,
      total_income: 0,
      total_expense: 0,
      created_at: new Date().toISOString(),
    });
    const saveNewAccount = await newAccountObject.save();
    if (!saveNewAccount) {
      logger.error(`An error occured while saving a new account that belongs to user id ${params.user_id}`);
      throw new InternalError();
    }
  }

  public async updateAccount(params: Account.Repository.UpdateProps): Promise<void> {
    const updateAccount = await accountModel
      .findByIdAndUpdate(params._id, {
        user_id: params.user_id,
        name: params.name,
        balance: params.balance,
        total_income: params.total_income,
        total_expense: params.total_expense,
        created_at: params.created_at,
      })
      .exec();
    if (!updateAccount) {
      logger.error(`An error occured while updating an account with id ${params._id}`);
      throw new InternalError();
    }
  }

  public async deleteAccount(params: Account.Repository.DeleteProps): Promise<void> {
    const deleteAccount = await accountModel.findOneAndDelete({ _id: params._id, user_id: params.user_id }).exec();
    if (!deleteAccount) {
      logger.error(`An error occured while deleting an account with id ${params._id}`);
      throw new InternalError();
    }
  }
}

export default AccountRepository;
