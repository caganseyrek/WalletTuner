import mongoose from "mongoose";

import transactionModel from "@/models/transactionModel";

import AppError from "@/utils/errorHandler";
import logger from "@/utils/logger";
import statusCodes from "@/utils/statusCodes";

import TransactionTypes from "@/types/transactions";

class TransactionRepository {
  async findTransactionsByAccountId({
    currentUser,
    accountId,
  }: TransactionTypes.Repository.FindTransactionsByAccountIdParams): Promise<
    TransactionTypes.Global.TransactionDetails[]
  > {
    const transactions: TransactionTypes.Global.TransactionDetails[] = await transactionModel
      .find({ belongsToUser: currentUser, accountId: accountId })
      .exec();
    return transactions;
  }

  async findTransactionById({
    currentUser,
    transactionId,
  }: TransactionTypes.Repository.FindTransactionByIdParams): Promise<TransactionTypes.Global.TransactionDetails> {
    const transaction: TransactionTypes.Global.TransactionDetails = await transactionModel
      .findOne({ _id: transactionId, belongsToUser: currentUser })
      .exec();
    return transaction;
  }

  async findTransactionsByUserId({
    currentUser,
  }: TransactionTypes.Repository.FindTransactionsByUserIdParams): Promise<
    TransactionTypes.Global.TransactionDetails[]
  > {
    const transactions: TransactionTypes.Global.TransactionDetails[] = await transactionModel
      .find({ belongsToUser: currentUser })
      .exec();
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
    const newTransactionObject = new transactionModel<TransactionTypes.Global.TransactionDetails>({
      _id: new mongoose.Types.ObjectId(),
      accountId: accountId,
      belongsToUser: belongsToUser,
      transactionType: transactionType,
      transactionDescription: transactionDescription,
      transactionDateTime: transactionDateTime,
      transactionValue: transactionValue,
    });

    const saveNewTransaction = await newTransactionObject.save();
    if (!saveNewTransaction) {
      logger.error(`An error occured while saving a new transaction that belongs to user id ${belongsToUser}`);
      throw new AppError({
        statusCode: statusCodes.internalServerError,
        message: "statusMessages.internalError",
      });
    }
    return saveNewTransaction;
  }

  async updateTransaction({
    currentUser,
    accountId,
    transactionId,
    transactionType,
    transactionDescription,
    transactionDateTime,
    transactionValue,
  }: TransactionTypes.Repository.UpdateTransactionParams): Promise<void> {
    const updateTransaction = await transactionModel
      .findByIdAndUpdate(transactionId, {
        accountId: accountId,
        belongsToUser: currentUser,
        transactionType: transactionType,
        transactionDescription: transactionDescription,
        transactionDateTime: transactionDateTime,
        transactionValue: transactionValue,
      })
      .exec();
    if (!updateTransaction) {
      logger.error(`An error occured while updating a transaction with id ${transactionId}`);
      throw new AppError({
        statusCode: statusCodes.internalServerError,
        message: "statusMessages.internalError",
      });
    }
    return;
  }

  async deleteTransaction({
    currentUser,
    transactionId,
  }: TransactionTypes.Repository.DeleteTransactionParams): Promise<void> {
    const deleteTransaction = await transactionModel
      .findOneAndDelete({ _id: transactionId, belongsToUser: currentUser })
      .exec();
    if (!deleteTransaction) {
      logger.error(`An error occured while deleting a transaction with id ${transactionId}`);
      throw new AppError({
        statusCode: statusCodes.internalServerError,
        message: "statusMessages.internalError",
      });
    }
    return;
  }
}

export default TransactionRepository;
