import mongoose from "mongoose";

import { InternalError } from "@/app/error";

import transactionModel from "@/resources/transaction/transaction.model";

import logger from "@/utils/logger";
import Sanitizer from "@/utils/sanitizer";

import { Transaction } from "./transaction.types";

class TransactionRepository {
  public async findById(params: Transaction.FindByIdProps): Promise<Transaction.TransactionProps | null> {
    const sanitizedQuery = Sanitizer.sanitizeQuery<Transaction.FindByIdProps>({
      _id: params._id,
      user_id: params.user_id,
    });
    const transaction: Transaction.TransactionProps | null = await transactionModel.findOne(sanitizedQuery).exec();
    return transaction;
  }

  public async findByAccountId(params: Transaction.FindByAccountIdProps): Promise<Transaction.TransactionProps[]> {
    const sanitizedQuery = Sanitizer.sanitizeQuery<Transaction.FindByAccountIdProps>({
      user_id: params.user_id,
      account_id: params.account_id,
    });
    const transactions: Transaction.TransactionProps[] = await transactionModel.find(sanitizedQuery).exec();
    return transactions;
  }

  public async findByUserId(params: Transaction.FindByUserIdProps): Promise<Transaction.TransactionProps[]> {
    const sanitizedQuery = Sanitizer.sanitizeQuery<Transaction.FindByUserIdProps>({
      user_id: params.user_id,
    });
    const transactions: Transaction.TransactionProps[] = await transactionModel.find(sanitizedQuery).exec();
    return transactions;
  }

  public async createTransaction(params: Transaction.Repository.CreateProps): Promise<void> {
    const sanitizedNewTransactionObject = Sanitizer.sanitize<Transaction.TransactionProps>({
      _id: new mongoose.Types.ObjectId(),
      user_id: params.user_id,
      account_id: params.account_id,
      type: params.type,
      amount: params.amount,
      timestamp: params.timestamp,
      note: params.note,
    });
    const newTransactionObject = new transactionModel<Transaction.TransactionProps>(sanitizedNewTransactionObject);
    const saveNewTransaction = await newTransactionObject.save();
    if (!saveNewTransaction) {
      logger.error(`An error occured while saving a new transaction that belongs to user id ${params.user_id}`);
      throw new InternalError();
    }
    return saveNewTransaction;
  }

  public async updateTransaction(params: Transaction.Repository.UpdateProps): Promise<void> {
    const sanitizedTransactionId = Sanitizer.sanitize<mongoose.Types.ObjectId>(params._id);
    const sanitizedTransactionModel = Sanitizer.sanitize<Omit<Transaction.Repository.UpdateProps, "_id">>({
      user_id: params.user_id,
      account_id: params.account_id,
      type: params.type,
      amount: params.amount,
      timestamp: params.timestamp,
      note: params.note,
    });
    const updateTransaction = await transactionModel
      .findByIdAndUpdate(sanitizedTransactionId, { ...sanitizedTransactionModel })
      .exec();
    if (!updateTransaction) {
      logger.error(`An error occured while updating a transaction with id ${params._id}`);
      throw new InternalError();
    }
  }

  public async deleteTransaction(params: Transaction.Repository.DeleteProps): Promise<void> {
    const sanitizedQuery = Sanitizer.sanitizeQuery<Transaction.Repository.DeleteProps>({
      _id: params._id,
      user_id: params.user_id,
    });
    const deleteTransaction = await transactionModel.findOneAndDelete(sanitizedQuery).exec();
    if (!deleteTransaction) {
      logger.error(`An error occured while deleting a transaction with id ${params._id}`);
      throw new InternalError();
    }
  }
}

export default TransactionRepository;
