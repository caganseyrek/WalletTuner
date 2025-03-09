import { Transaction } from "@wallettuner/resource-types";
import mongoose from "mongoose";

import { InternalError } from "@/app/error/errors";

import transactionModel from "@/resources/transaction/transaction.model";

import logger from "@/utils/logger";

class TransactionRepository {
  public async findById(params: Transaction.FindByIdProps): Promise<Transaction.TransactionProps | null> {
    const transaction: Transaction.TransactionProps | null = await transactionModel
      .findOne({ _id: params._id, user_id: params.user_id })
      .exec();
    return transaction;
  }

  public async findByAccountId(params: Transaction.FindByAccountIdProps): Promise<Transaction.TransactionProps[]> {
    const transactions: Transaction.TransactionProps[] = await transactionModel
      .find({ user_id: params.user_id, account_id: params.account_id })
      .exec();
    return transactions;
  }

  public async findByUserId(params: Transaction.FindByUserIdProps): Promise<Transaction.TransactionProps[]> {
    const transactions: Transaction.TransactionProps[] = await transactionModel
      .find({ user_id: params.user_id })
      .exec();
    return transactions;
  }

  public async createTransaction(params: Transaction.Repository.CreateProps): Promise<void> {
    const newTransactionObject = new transactionModel<Transaction.TransactionProps>({
      _id: new mongoose.Types.ObjectId(),
      user_id: params.user_id,
      account_id: params.account_id,
      type: params.type,
      amount: params.amount,
      timestamp: params.timestamp,
      note: params.note,
    });
    const saveNewTransaction = await newTransactionObject.save();
    if (!saveNewTransaction) {
      logger.error(`An error occured while saving a new transaction that belongs to user id ${params.user_id}`);
      throw new InternalError();
    }
  }

  public async updateTransaction(params: Transaction.Repository.UpdateProps): Promise<void> {
    const updateTransaction = await transactionModel
      .findByIdAndUpdate(params._id, {
        user_id: params.user_id,
        account_id: params.account_id,
        type: params.type,
        amount: params.amount,
        timestamp: params.timestamp,
        note: params.note,
      })
      .exec();
    if (!updateTransaction) {
      logger.error(`An error occured while updating a transaction with id ${params._id}`);
      throw new InternalError();
    }
  }

  public async deleteTransaction(params: Transaction.Repository.DeleteProps): Promise<void> {
    const deleteTransaction = await transactionModel
      .findOneAndDelete({ _id: params._id, user_id: params.user_id })
      .exec();
    if (!deleteTransaction) {
      logger.error(`An error occured while deleting a transaction with id ${params._id}`);
      throw new InternalError();
    }
  }
}

export default TransactionRepository;
