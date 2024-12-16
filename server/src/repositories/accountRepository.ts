import mongoose from "mongoose";

import accountModel from "@/models/accountModel";

import { AppError, statusCodes } from "@/helpers/responseHelper";

import logger from "@/utils/logger";
import Sanitizer from "@/utils/sanitizer";

import AccountTypes from "@/types/account";

class AccountRepository {
  async findAccountByName({
    currentUser,
    accountName,
  }: AccountTypes.Repository.FindAccountByNameParams): Promise<AccountTypes.Global.AccountDetails[]> {
    const sanitizedQuery = Sanitizer.sanitizeQuery({ belongsToUser: currentUser, accountName: accountName });
    const accounts: AccountTypes.Global.AccountDetails[] = await accountModel.find(sanitizedQuery).exec();
    return accounts;
  }

  async findAccountById({
    currentUser,
    accountId,
  }: AccountTypes.Repository.FindAccountByIdParams): Promise<AccountTypes.Global.AccountDetails> {
    const sanitizedQuery = Sanitizer.sanitizeQuery({ _id: accountId, belongsToUser: currentUser });
    const accounts: AccountTypes.Global.AccountDetails = await accountModel.findOne(sanitizedQuery).exec();
    return accounts;
  }

  async findAccountByUserId({
    currentUser,
  }: AccountTypes.Repository.FindAccountByUserIdParams): Promise<AccountTypes.Global.AccountDetails[]> {
    const sanitizedQuery = Sanitizer.sanitizeQuery({ belongsToUser: currentUser });
    const accounts: AccountTypes.Global.AccountDetails[] = await accountModel.find(sanitizedQuery).exec();
    return accounts;
  }

  async createAccount({ currentUser, accountName }: AccountTypes.Repository.CreateAccountParams): Promise<void> {
    const sanitizedNewAccountObject = Sanitizer.sanitizeObject<AccountTypes.Global.AccountDetails>({
      _id: new mongoose.Types.ObjectId(),
      belongsToUser: currentUser,
      accountName: accountName,
      createdAt: new Date().toISOString(),
      balance: 0,
      totalIncome: 0,
      totalExpense: 0,
    });
    const newAccountObject = new accountModel<AccountTypes.Global.AccountDetails>(sanitizedNewAccountObject);
    const saveNewAccount = await newAccountObject.save();
    if (!saveNewAccount) {
      logger.error(`An error occured while saving a new account that belongs to user id ${currentUser}`);
      throw new AppError({
        statusCode: statusCodes.internalServerError,
        message: "statusMessages.internalError",
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
    const sanitizedAccountId = Sanitizer.sanitizeValue(accountId);
    const sanitizedAccountModel = Sanitizer.sanitizeObject<object>({
      belongsToUser: currentUser,
      accountName: accountName,
      createdAt: createdAt,
      balance: balance,
      totalIncome: totalIncome,
      totalExpense: totalExpense,
    });
    const updateAccount = await accountModel.findByIdAndUpdate(sanitizedAccountId, { ...sanitizedAccountModel }).exec();
    if (!updateAccount) {
      logger.error(`An error occured while updating a accounts with id ${accountId}`);
      throw new AppError({
        statusCode: statusCodes.internalServerError,
        message: "statusMessages.internalError",
      });
    }
    return;
  }

  async deleteAccount({ currentUser, accountId }: AccountTypes.Repository.DeleteAccountParams): Promise<void> {
    const sanitizedQuery = Sanitizer.sanitizeQuery({ _id: accountId, belongsToUser: currentUser });
    const deleteAccount = await accountModel.findOneAndDelete(sanitizedQuery).exec();
    if (!deleteAccount) {
      logger.error(`An error occured while deleting a account with id ${accountId}`);
      throw new AppError({
        statusCode: statusCodes.internalServerError,
        message: "statusMessages.internalError",
      });
    }
    return;
  }
}

export default AccountRepository;
