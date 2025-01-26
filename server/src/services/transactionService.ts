import AccountRepository from "@/repositories/accountRepository";
import TransactionRepository from "@/repositories/transactionRepository";

import STATUS_CODES from "@/utils/constants/statusCodes";
import BalanceHelper from "@/utils/helpers/balanceHelper";
import AppError from "@/utils/helpers/errorHelper";

import AccountTypes from "@/types/accounts";
import TransactionTypes from "@/types/transactions";
import { UtilsTypes } from "@/types/utils";

class TransactionService {
  private transactionRepository: TransactionRepository;
  private accountRepository: AccountRepository;

  constructor() {
    this.transactionRepository = new TransactionRepository();
    this.accountRepository = new AccountRepository();
  }

  public async getTransactions({
    userId,
  }: TransactionTypes.Service.GetTransactionsParams): Promise<TransactionTypes.TransactionObject[]> {
    const transactions: TransactionTypes.TransactionObject[] =
      await this.transactionRepository.findTransactionsByUserId({ userId: userId });
    if (!transactions) {
      throw new AppError({
        statusCode: STATUS_CODES.notFound.code,
        message: "transaction.error.noTransactionsFound",
      });
    }
    return transactions;
  }

  public async createTransaction({
    userId,
    accountId,
    transactionType,
    transactionDescription,
    transactionDateTime,
    transactionValue,
  }: TransactionTypes.Service.CreateTransactionParams) {
    const accountDetails: AccountTypes.AccountObject = await this.accountRepository.findAccountById({
      userId: userId,
      accountId: accountId,
    });
    if (!accountDetails) {
      throw new AppError({
        statusCode: STATUS_CODES.internalServerError.code,
        message: STATUS_CODES.internalServerError.message,
      });
    }
    await this.transactionRepository.createTransaction({
      accountId: accountId,
      belongsToUser: userId,
      transactionType: transactionType,
      transactionDescription: transactionDescription,
      transactionDateTime: transactionDateTime,
      transactionValue: transactionValue,
    });
    const { newAccountBalance, newTotalIncome, newTotalExpense }: UtilsTypes.BalanceHelper.UpdatedBalancesParams =
      BalanceHelper.addNewTransactionValue({
        transactionType: transactionType,
        transactionValue: transactionValue,
        balance: accountDetails.balance,
        totalIncome: accountDetails.totalIncome,
        totalExpense: accountDetails.totalExpense,
      });
    await this.accountRepository.updateAccount({
      userId: userId,
      accountId: accountDetails._id,
      accountName: accountDetails.accountName,
      createdAt: accountDetails.createdAt,
      balance: newAccountBalance,
      totalIncome: newTotalIncome,
      totalExpense: newTotalExpense,
    });
    return;
  }

  public async updateTransaction({
    userId,
    accountId,
    transactionId,
    transactionType,
    transactionDescription,
    transactionDateTime,
    transactionValue,
  }: TransactionTypes.Service.UpdateTransactionParams): Promise<void> {
    const currentTransactionDetails: TransactionTypes.TransactionObject =
      await this.transactionRepository.findTransactionById({
        userId: userId,
        transactionId: transactionId,
      });
    if (!currentTransactionDetails) {
      throw new AppError({
        statusCode: STATUS_CODES.internalServerError.code,
        message: STATUS_CODES.internalServerError.message,
      });
    }
    const accountDetails: AccountTypes.AccountObject = await this.accountRepository.findAccountById({
      accountId: accountId,
      userId: userId,
    });
    if (!accountDetails) {
      throw new AppError({
        statusCode: STATUS_CODES.internalServerError.code,
        message: STATUS_CODES.internalServerError.message,
      });
    }
    const { newAccountBalance, newTotalIncome, newTotalExpense } = BalanceHelper.updateBalances({
      originalTransactionType: currentTransactionDetails.transactionType,
      updatedTransactionType: transactionType,
      originalTransactionValue: currentTransactionDetails.transactionValue,
      updatedTransactionValue: transactionValue,
      currentBalance: accountDetails.balance,
      currentTotalIncome: accountDetails.totalIncome,
      currentTotalExpense: accountDetails.totalExpense,
    });
    await this.accountRepository.updateAccount({
      userId: userId,
      accountId: accountDetails._id,
      accountName: accountDetails.accountName,
      createdAt: accountDetails.createdAt,
      balance: newAccountBalance,
      totalIncome: newTotalIncome,
      totalExpense: newTotalExpense,
    });
    await this.transactionRepository.updateTransaction({
      userId: userId,
      transactionId: currentTransactionDetails._id,
      accountId: currentTransactionDetails.accountId,
      transactionType: transactionType,
      transactionDescription: transactionDescription,
      transactionDateTime: transactionDateTime,
      transactionValue: transactionValue,
    });
    return;
  }

  public async deleteTransaction({ userId, transactionId }: TransactionTypes.Service.DeleteTransactionParams) {
    const transactionDetails: TransactionTypes.TransactionObject = await this.transactionRepository.findTransactionById(
      {
        userId: userId,
        transactionId: transactionId,
      },
    );
    if (!transactionDetails) {
      throw new AppError({
        statusCode: STATUS_CODES.internalServerError.code,
        message: STATUS_CODES.internalServerError.message,
      });
    }
    const accountDetails: AccountTypes.AccountObject = await this.accountRepository.findAccountById({
      userId: userId,
      accountId: transactionDetails.accountId,
    });
    if (!accountDetails) {
      throw new AppError({
        statusCode: STATUS_CODES.internalServerError.code,
        message: STATUS_CODES.internalServerError.message,
      });
    }
    const { newAccountBalance, newTotalIncome, newTotalExpense } = BalanceHelper.subtractDeletedTransactionValue({
      transactionType: transactionDetails.transactionType,
      transactionValue: transactionDetails.transactionValue,
      balance: accountDetails.balance,
      totalIncome: accountDetails.totalIncome,
      totalExpense: accountDetails.totalExpense,
    });
    await this.accountRepository.updateAccount({
      userId: userId,
      accountId: accountDetails._id,
      accountName: accountDetails.accountName,
      createdAt: accountDetails.createdAt,
      balance: newAccountBalance,
      totalIncome: newTotalIncome,
      totalExpense: newTotalExpense,
    });
    await this.transactionRepository.deleteTransaction({
      userId: userId,
      transactionId: transactionId,
    });
    return;
  }
}

export default TransactionService;
