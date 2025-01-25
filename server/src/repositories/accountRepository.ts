import mongoose from "mongoose";

import accountModel from "@/models/accountModel";

import STATUS_CODES from "@/utils/constants/statusCodes";
import AppError from "@/utils/helpers/errorHelper";
import logger from "@/utils/logger";
import Sanitizer from "@/utils/sanitizer";

import AccountTypes from "@/types/accounts";

class AccountRepository {
  async findAccountByName({
    userId,
    accountName,
  }: AccountTypes.Repository.FindAccountByNameParams): Promise<AccountTypes.AccountObject[]> {
    const sanitizedQuery = Sanitizer.sanitizeQuery({ belongsToUser: userId, accountName: accountName });
    const accounts: AccountTypes.AccountObject[] = await accountModel.find(sanitizedQuery).exec();
    return accounts;
  }

  async findAccountById({
    userId,
    accountId,
  }: AccountTypes.Repository.FindAccountByIdParams): Promise<AccountTypes.AccountObject> {
    const sanitizedQuery = Sanitizer.sanitizeQuery({ _id: accountId, belongsToUser: userId });
    const accounts: AccountTypes.AccountObject = await accountModel.findOne(sanitizedQuery).exec();
    return accounts;
  }

  async findAccountByUserId({
    userId,
  }: AccountTypes.Repository.FindAccountByUserIdParams): Promise<AccountTypes.AccountObject[]> {
    const sanitizedQuery = Sanitizer.sanitizeQuery({ belongsToUser: userId });
    const accounts: AccountTypes.AccountObject[] = await accountModel.find(sanitizedQuery).exec();
    return accounts;
  }

  async createAccount({ userId, accountName }: AccountTypes.Repository.CreateAccountParams): Promise<void> {
    const sanitizedNewAccountObject = Sanitizer.sanitizeObject<AccountTypes.AccountObject>({
      _id: new mongoose.Types.ObjectId(),
      belongsToUser: userId,
      accountName: accountName,
      createdAt: new Date().toISOString(),
      balance: 0,
      totalIncome: 0,
      totalExpense: 0,
    });
    const newAccountObject = new accountModel<AccountTypes.AccountObject>(sanitizedNewAccountObject);
    const saveNewAccount = await newAccountObject.save();
    if (!saveNewAccount) {
      logger.error(`An error occured while saving a new account that belongs to user id ${userId}`);
      throw new AppError({
        statusCode: STATUS_CODES.internalServerError.code,
        message: STATUS_CODES.internalServerError.message,
      });
    }
    return newAccountObject;
  }

  async updateAccount({
    userId,
    accountId,
    accountName,
    createdAt,
    balance,
    totalIncome,
    totalExpense,
  }: AccountTypes.Repository.UpdateAccountParams): Promise<void> {
    const sanitizedAccountId = Sanitizer.sanitizeValue(accountId);
    const sanitizedAccountModel = Sanitizer.sanitizeObject<object>({
      belongsToUser: userId,
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
        statusCode: STATUS_CODES.internalServerError.code,
        message: STATUS_CODES.internalServerError.message,
      });
    }
    return;
  }

  async deleteAccount({ userId, accountId }: AccountTypes.Repository.DeleteAccountParams): Promise<void> {
    const sanitizedQuery = Sanitizer.sanitizeQuery({ _id: accountId, belongsToUser: userId });
    const deleteAccount = await accountModel.findOneAndDelete(sanitizedQuery).exec();
    if (!deleteAccount) {
      logger.error(`An error occured while deleting a account with id ${accountId}`);
      throw new AppError({
        statusCode: STATUS_CODES.internalServerError.code,
        message: STATUS_CODES.internalServerError.message,
      });
    }
    return;
  }
}

export default AccountRepository;
