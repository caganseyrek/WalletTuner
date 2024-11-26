import mongoose from "mongoose";

import accountModel from "@/models/accountModel";

import AppError from "@/utils/errorHandler";
import logger from "@/utils/logger";
import statusCodes from "@/utils/statusCodes";

import AccountTypes from "@/types/account";

class AccountRepository {
  async findAccountByName({
    currentUser,
    accountName,
  }: AccountTypes.Repository.FindAccountByNameParams): Promise<AccountTypes.Global.AccountDetails[]> {
    const accounts: AccountTypes.Global.AccountDetails[] = await accountModel
      .find({ belongsToUser: currentUser, accountName: accountName })
      .exec();
    return accounts;
  }

  async findAccountById({
    currentUser,
    accountId,
  }: AccountTypes.Repository.FindAccountByIdParams): Promise<AccountTypes.Global.AccountDetails> {
    const accounts: AccountTypes.Global.AccountDetails = await accountModel
      .findOne({ _id: accountId, belongsToUser: currentUser })
      .exec();
    return accounts;
  }

  async findAccountByUserId({
    currentUser,
  }: AccountTypes.Repository.FindAccountByUserIdParams): Promise<AccountTypes.Global.AccountDetails[]> {
    const accounts: AccountTypes.Global.AccountDetails[] = await accountModel
      .find({ belongsToUser: currentUser })
      .exec();
    return accounts;
  }

  async createAccount({ currentUser, accountName }: AccountTypes.Repository.CreateAccountParams): Promise<void> {
    const newAccountObject = new accountModel<AccountTypes.Global.AccountDetails>({
      _id: new mongoose.Types.ObjectId(),
      belongsToUser: currentUser,
      accountName: accountName,
      createdAt: new Date().toISOString(),
      balance: 0,
      totalIncome: 0,
      totalExpense: 0,
    });

    const saveNewAccount = await newAccountObject.save();
    if (!saveNewAccount) {
      logger.error(`An error occured while saving a new account that belongs to user id ${currentUser}`);
      throw new AppError({
        statusCode: statusCodes.internalServerError,
        messageKey: "statusMessages.internalError",
      });
    }
    return newAccountObject;
  }

  async updateAccount({
    currentUser,
    accountId,
    accountName,
    createdAt,
    balance,
    totalIncome,
    totalExpense,
  }: AccountTypes.Repository.UpdateAccountParams): Promise<void> {
    const updateAccount = await accountModel
      .findByIdAndUpdate(accountId, {
        belongsToUser: currentUser,
        accountName: accountName,
        createdAt: createdAt,
        balance: balance,
        totalIncome: totalIncome,
        totalExpense: totalExpense,
      })
      .exec();
    if (!updateAccount) {
      logger.error(`An error occured while updating a accounts with id ${accountId}`);
      throw new AppError({
        statusCode: statusCodes.internalServerError,
        messageKey: "statusMessages.internalError",
      });
    }
    return;
  }

  async deleteAccount({ currentUser, accountId }: AccountTypes.Repository.DeleteAccountParams): Promise<void> {
    const deleteAccount = await accountModel.findOneAndDelete({ _id: accountId, belongsToUser: currentUser }).exec();
    if (!deleteAccount) {
      logger.error(`An error occured while deleting a account with id ${accountId}`);
      throw new AppError({
        statusCode: statusCodes.internalServerError,
        messageKey: "statusMessages.internalError",
      });
    }
    return;
  }
}

export default AccountRepository;
