import mongoose from "mongoose";

import transactionModel from "@/models/transactionModel";

import STATUS_CODES from "@/utils/constants/statusCodes";
import AppError from "@/utils/helpers/errorHelper";
import logger from "@/utils/logger";
import Sanitizer from "@/utils/sanitizer";

import TransactionTypes from "@/types/transactions";

class TransactionRepository {
  async findTransactionById({
    userId,
    transactionId,
  }: TransactionTypes.Repository.FindTransactionByIdParams): Promise<TransactionTypes.TransactionObject> {
    const sanitizedQuery = Sanitizer.sanitizeQuery({ _id: transactionId, belongsToUser: userId });
    const transaction: TransactionTypes.TransactionObject = await transactionModel.findOne(sanitizedQuery).exec();
    return transaction;
  }

  async findTransactionsByAccountId({
    userId,
    accountId,
  }: TransactionTypes.Repository.FindTransactionsByAccountIdParams): Promise<TransactionTypes.TransactionObject[]> {
    const sanitizedQuery = Sanitizer.sanitizeQuery({ belongsToUser: userId, accountId: accountId });
    const transactions: TransactionTypes.TransactionObject[] = await transactionModel.find(sanitizedQuery).exec();
    return transactions;
  }

  async findTransactionsByUserId({
    userId,
  }: TransactionTypes.Repository.FindTransactionsByUserIdParams): Promise<TransactionTypes.TransactionObject[]> {
    const sanitizedQuery = Sanitizer.sanitizeQuery({ belongsToUser: userId });
    const transactions: TransactionTypes.TransactionObject[] = await transactionModel.find(sanitizedQuery).exec();
    return transactions;
  }

  async createTransaction({
    belongsToUser,
    accountId,
    transactionType,
    transactionDescription,
    transactionDateTime,
    transactionValue,
  }: TransactionTypes.Repository.CreateTransactionParams): Promise<void> {
    const sanitizedNewTransactionObject = Sanitizer.sanitizeObject<TransactionTypes.TransactionObject>({
      _id: new mongoose.Types.ObjectId(),
      accountId: accountId,
      belongsToUser: belongsToUser,
      transactionType: transactionType,
      transactionDescription: transactionDescription,
      transactionDateTime: transactionDateTime,
      transactionValue: transactionValue,
    });
    const newTransactionObject = new transactionModel<TransactionTypes.TransactionObject>(
      sanitizedNewTransactionObject,
    );
    const saveNewTransaction = await newTransactionObject.save();
    if (!saveNewTransaction) {
      logger.error(`An error occured while saving a new transaction that belongs to user id ${belongsToUser}`);
      throw new AppError({
        statusCode: STATUS_CODES.internalServerError.code,
        message: STATUS_CODES.internalServerError.message,
      });
    }
    return saveNewTransaction;
  }

  async updateTransaction({
    userId,
    accountId,
    transactionId,
    transactionType,
    transactionDescription,
    transactionDateTime,
    transactionValue,
  }: TransactionTypes.Repository.UpdateTransactionParams): Promise<void> {
    const sanitizedTransactionId = Sanitizer.sanitizeValue(transactionId);
    const sanitizedTransactionModel = Sanitizer.sanitizeObject<object>({
      accountId: accountId,
      belongsToUser: userId,
      transactionType: transactionType,
      transactionDescription: transactionDescription,
      transactionDateTime: transactionDateTime,
      transactionValue: transactionValue,
    });
    const updateTransaction = await transactionModel
      .findByIdAndUpdate(sanitizedTransactionId, { ...sanitizedTransactionModel })
      .exec();
    if (!updateTransaction) {
      logger.error(`An error occured while updating a transaction with id ${transactionId}`);
      throw new AppError({
        statusCode: STATUS_CODES.internalServerError.code,
        message: STATUS_CODES.internalServerError.message,
      });
    }
    return;
  }

  async deleteTransaction({
    userId,
    transactionId,
  }: TransactionTypes.Repository.DeleteTransactionParams): Promise<void> {
    const sanitizedQuery = Sanitizer.sanitizeQuery({ _id: transactionId, belongsToUser: userId });
    const deleteTransaction = await transactionModel.findOneAndDelete(sanitizedQuery).exec();
    if (!deleteTransaction) {
      logger.error(`An error occured while deleting a transaction with id ${transactionId}`);
      throw new AppError({
        statusCode: STATUS_CODES.internalServerError.code,
        message: STATUS_CODES.internalServerError.message,
      });
    }
    return;
  }
}

export default TransactionRepository;
