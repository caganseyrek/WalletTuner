import { Account, Transaction } from "@wallettuner/resource-types";

import { BadRequestError, NotFoundError } from "@/app/error/errors";

import AccountRepository from "@/resources/account/account.repository";
import TransactionRepository from "@/resources/transaction/transaction.repository";

import BalanceHelper, { TransactionType, UpdatedBalanceProps } from "@/helpers/balanceHelper";

class TransactionService {
  private transactionRepository: TransactionRepository;
  private accountRepository: AccountRepository;

  constructor() {
    this.transactionRepository = new TransactionRepository();
    this.accountRepository = new AccountRepository();
  }

  public async getTransactions(params: Transaction.FindByUserIdProps): Promise<Transaction.TransactionProps[]> {
    const transactions: Transaction.TransactionProps[] = await this.transactionRepository.findByUserId({
      user_id: params.user_id,
    });
    if (!transactions) {
      throw new NotFoundError();
    }
    return transactions;
  }

  public async createTransaction(params: Transaction.Service.CreateProps): Promise<void> {
    const accountDetails: Account.AccountProps | null = await this.accountRepository.findById({
      _id: params.account_id,
      user_id: params.user_id,
    });
    if (!accountDetails) {
      throw new BadRequestError();
    }
    await this.transactionRepository.createTransaction({
      user_id: params.user_id,
      account_id: accountDetails._id,
      type: params.type,
      amount: params.amount,
      timestamp: params.timestamp,
      note: params.note,
    });
    const { newAccountBalance, newTotalIncome, newTotalExpense }: UpdatedBalanceProps =
      BalanceHelper.transactionCreated({
        type: params.type as TransactionType,
        amount: params.amount,
        balance: accountDetails.balance,
        totalIncome: accountDetails.total_income,
        totalExpense: accountDetails.total_expense,
      });
    await this.accountRepository.updateAccount({
      _id: accountDetails._id,
      user_id: params.user_id,
      name: accountDetails.name,
      balance: newAccountBalance,
      total_income: newTotalIncome,
      total_expense: newTotalExpense,
      created_at: accountDetails.created_at,
    });
  }

  public async updateTransaction(params: Transaction.Service.UpdateProps): Promise<void> {
    const currentTransactionDetails: Transaction.TransactionProps | null = await this.transactionRepository.findById({
      _id: params._id,
      user_id: params.user_id,
    });
    const accountDetails: Account.AccountProps | null = await this.accountRepository.findById({
      _id: params._id,
      user_id: params.user_id,
    });
    if (!currentTransactionDetails || !accountDetails) {
      throw new BadRequestError();
    }
    const { newAccountBalance, newTotalIncome, newTotalExpense }: UpdatedBalanceProps =
      BalanceHelper.transactionUpdated({
        originalType: currentTransactionDetails.type as TransactionType,
        updatedType: params.type as TransactionType,
        originalAmount: currentTransactionDetails.amount,
        updatedAmount: params.amount,
        currentBalance: accountDetails.balance,
        currentTotalIncome: accountDetails.total_income,
        currentTotalExpense: accountDetails.total_expense,
      });
    await this.accountRepository.updateAccount({
      _id: accountDetails._id,
      user_id: accountDetails.user_id,
      name: accountDetails.name,
      balance: newAccountBalance,
      total_income: newTotalIncome,
      total_expense: newTotalExpense,
      created_at: accountDetails.created_at,
    });
    await this.transactionRepository.updateTransaction({
      _id: currentTransactionDetails._id,
      user_id: currentTransactionDetails._id,
      account_id: currentTransactionDetails.account_id,
      type: params.type,
      amount: params.amount,
      timestamp: params.timestamp,
      note: params.note,
    });
  }

  public async deleteTransaction(params: Transaction.Service.DeleteProps): Promise<void> {
    const transactionDetails: Transaction.TransactionProps | null = await this.transactionRepository.findById({
      _id: params._id,
      user_id: params.user_id,
    });
    if (!transactionDetails) {
      throw new BadRequestError();
    }
    const accountDetails: Account.AccountProps | null = await this.accountRepository.findById({
      _id: transactionDetails.account_id,
      user_id: params._id,
    });
    if (!accountDetails) {
      throw new BadRequestError();
    }
    const { newAccountBalance, newTotalIncome, newTotalExpense }: UpdatedBalanceProps =
      BalanceHelper.transactionDeleted({
        type: transactionDetails.type as TransactionType,
        amount: transactionDetails.amount,
        balance: accountDetails.balance,
        totalIncome: accountDetails.total_income,
        totalExpense: accountDetails.total_expense,
      });
    await this.accountRepository.updateAccount({
      _id: accountDetails._id,
      user_id: params.user_id,
      name: accountDetails.name,
      balance: newAccountBalance,
      total_income: newTotalIncome,
      total_expense: newTotalExpense,
      created_at: accountDetails.created_at,
    });
    await this.transactionRepository.deleteTransaction({
      _id: params._id,
      user_id: params.user_id,
    });
  }
}

export default TransactionService;
