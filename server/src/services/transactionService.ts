import AccountRepository from "@/repositories/accountRepository";
import TransactionRepository from "@/repositories/transactionRepository";

import BalanceHelper from "@/helpers/balanceHelper";
import { AppError, statusCodes } from "@/helpers/responseHelper";

import AccountTypes from "@/types/account";
import TransactionTypes from "@/types/transactions";
import { BalanceHelperTypes } from "@/types/utils";

class TransactionService {
  private transactionRepository: TransactionRepository;
  private accountRepository: AccountRepository;

  constructor() {
    this.transactionRepository = new TransactionRepository();
    this.accountRepository = new AccountRepository();
  }

  async getTransactions({
    currentUser,
  }: TransactionTypes.Service.GetTransactionsParams): Promise<TransactionTypes.Global.TransactionDetails[]> {
    const transactions: TransactionTypes.Global.TransactionDetails[] =
      await this.transactionRepository.findTransactionsByUserId({ currentUser: currentUser });
    if (!transactions) {
      throw new AppError({
        statusCode: statusCodes.notFound,
        message: "transaction.error.noTransactionsFound",
      });
    }
    return transactions;
  }

  async createTransaction({
    currentUser,
    accountId,
    transactionType,
    transactionDescription,
    transactionDateTime,
    transactionValue,
  }: TransactionTypes.Service.CreateTransactionParams) {
    const accountDetails: AccountTypes.Global.AccountDetails = await this.accountRepository.findAccountById({
      currentUser: currentUser,
      accountId: accountId,
    });
    if (!accountDetails) {
      throw new AppError({
        statusCode: statusCodes.internalServerError,
        message: "statusMessages.internalError",
      });
    }
    await this.transactionRepository.createTransaction({
      accountId: accountId,
      belongsToUser: currentUser,
      transactionType: transactionType,
      transactionDescription: transactionDescription,
      transactionDateTime: transactionDateTime,
      transactionValue: transactionValue,
    });
    const { newAccountBalance, newTotalIncome, newTotalExpense }: BalanceHelperTypes.UpdatedBalances =
      BalanceHelper.addNewTransactionValue({
        transactionType: transactionType,
        transactionValue: transactionValue,
        balance: accountDetails.balance,
        totalIncome: accountDetails.totalIncome,
        totalExpense: accountDetails.totalExpense,
      });
    await this.accountRepository.updateAccount({
      currentUser: currentUser,
      accountId: accountDetails._id,
      accountName: accountDetails.accountName,
      createdAt: accountDetails.createdAt,
      balance: newAccountBalance,
      totalIncome: newTotalIncome,
      totalExpense: newTotalExpense,
    });
    return;
  }

  async updateTransaction({
    currentUser,
    accountId,
    transactionId,
    transactionType,
    transactionDescription,
    transactionDateTime,
    transactionValue,
  }: TransactionTypes.Service.UpdateTransactionParams): Promise<void> {
    const currentTransactionDetails: TransactionTypes.Global.TransactionDetails =
      await this.transactionRepository.findTransactionById({
        currentUser: currentUser,
        transactionId: transactionId,
      });
    if (!currentTransactionDetails) {
      throw new AppError({
        statusCode: statusCodes.internalServerError,
        message: "statusMessages.internalError",
      });
    }
    const accountDetails: AccountTypes.Global.AccountDetails = await this.accountRepository.findAccountById({
      accountId: accountId,
      currentUser: currentUser,
    });
    if (!accountDetails) {
      throw new AppError({
        statusCode: statusCodes.internalServerError,
        message: "statusMessages.internalError",
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
      currentUser: currentUser,
      accountId: accountDetails._id,
      accountName: accountDetails.accountName,
      createdAt: accountDetails.createdAt,
      balance: newAccountBalance,
      totalIncome: newTotalIncome,
      totalExpense: newTotalExpense,
    });
    await this.transactionRepository.updateTransaction({
      currentUser: currentUser,
      transactionId: currentTransactionDetails._id,
      accountId: currentTransactionDetails.accountId,
      transactionType: transactionType,
      transactionDescription: transactionDescription,
      transactionDateTime: transactionDateTime,
      transactionValue: transactionValue,
    });
    return;
  }

  async deleteTransaction({ currentUser, transactionId }: TransactionTypes.Service.DeleteTransactionParams) {
    const transactionDetails: TransactionTypes.Global.TransactionDetails =
      await this.transactionRepository.findTransactionById({
        currentUser: currentUser,
        transactionId: transactionId,
      });
    if (!transactionDetails) {
      throw new AppError({
        statusCode: statusCodes.internalServerError,
        message: "statusMessages.internalError",
      });
    }
    const accountDetails: AccountTypes.Global.AccountDetails = await this.accountRepository.findAccountById({
      currentUser: currentUser,
      accountId: transactionDetails.accountId,
    });
    if (!accountDetails) {
      throw new AppError({
        statusCode: statusCodes.internalServerError,
        message: "statusMessages.internalError",
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
      currentUser: currentUser,
      accountId: accountDetails._id,
      accountName: accountDetails.accountName,
      createdAt: accountDetails.createdAt,
      balance: newAccountBalance,
      totalIncome: newTotalIncome,
      totalExpense: newTotalExpense,
    });
    await this.transactionRepository.deleteTransaction({
      currentUser: currentUser,
      transactionId: transactionId,
    });
    return;
  }
}

export default TransactionService;
