import mongoose from "mongoose";

import logger from "@/utils/logger";
import Sanitizer from "@/utils/sanitizer";

import TransactionTypes from "@/types/transactions";

import AppError from "@/app/error";
import STATUS_CODES from "@/constants/statusCodes";
import transactionModel from "@/resources/transaction/transactionModel";

class TransactionRepository {
  public async findTransactionById({
    userId,
    transactionId,
  }: TransactionTypes.Repository.FindTransactionByIdParams): Promise<TransactionTypes.TransactionObject> {
    const sanitizedQuery = Sanitizer.sanitizeQuery({ _id: transactionId, belongsToUser: userId });
    const transaction: TransactionTypes.TransactionObject = await transactionModel.findOne(sanitizedQuery).exec();
    return transaction;
  }

  public async findTransactionsByAccountId({
    userId,
    accountId,
  }: TransactionTypes.Repository.FindTransactionsByAccountIdParams): Promise<TransactionTypes.TransactionObject[]> {
    const sanitizedQuery = Sanitizer.sanitizeQuery({ belongsToUser: userId, accountId: accountId });
    const transactions: TransactionTypes.TransactionObject[] = await transactionModel.find(sanitizedQuery).exec();
    return transactions;
  }

  public async findTransactionsByUserId({
    userId,
  }: TransactionTypes.Repository.FindTransactionsByUserIdParams): Promise<TransactionTypes.TransactionObject[]> {
    const sanitizedQuery = Sanitizer.sanitizeQuery({ belongsToUser: userId });
    const transactions: TransactionTypes.TransactionObject[] = await transactionModel.find(sanitizedQuery).exec();
    return transactions;
  }

  public async createTransaction({
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

  public async updateTransaction({
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

  public async deleteTransaction({
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
