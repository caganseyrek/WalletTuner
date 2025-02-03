import AccountTypes from "@/types/accounts";
import TransactionTypes from "@/types/transactions";

import AppError from "@/app/error";
import STATUS_CODES from "@/constants/statusCodes";
import AccountRepository from "@/resources/account/repository";
import TransactionRepository from "@/resources/transaction/transactionRepository";

class AccountService {
  private accountRepository: AccountRepository;
  private transactionRepository: TransactionRepository;

  constructor() {
    this.accountRepository = new AccountRepository();
    this.transactionRepository = new TransactionRepository();
  }

  public async getAccounts({ userId }: AccountTypes.Service.GetAccountsParams): Promise<AccountTypes.AccountObject[]> {
    const accounts: AccountTypes.AccountObject[] = await this.accountRepository.findAccountByUserId({
      userId: userId,
    });
    if (!accounts || accounts.length === 0) {
      throw new AppError({
        statusCode: STATUS_CODES.notFound.code,
        message: "account.error.noAccountsFound",
      });
    }
    return accounts;
  }

  public async createAccount({ userId, accountName }: AccountTypes.Service.CreateAccountParams): Promise<void> {
    const doesAccountExists: AccountTypes.AccountObject[] = await this.accountRepository.findAccountByName({
      userId: userId,
      accountName: accountName,
    });
    if (doesAccountExists.length > 0) {
      throw new AppError({
        statusCode: STATUS_CODES.conflict.code,
        message: "account.error.accountExists",
      });
    }
    await this.accountRepository.createAccount({ userId: userId, accountName: accountName });
    return;
  }

  public async updateAccount({
    userId,
    accountId,
    accountName,
  }: AccountTypes.Service.UpdateAccountParams): Promise<void> {
    const doesAccountExists: AccountTypes.AccountObject[] = await this.accountRepository.findAccountByName({
      userId: userId,
      accountName: accountName,
    });
    if (doesAccountExists.length > 0) {
      throw new AppError({
        statusCode: STATUS_CODES.conflict.code,
        message: "account.error.accountExists",
      });
    }
    const currentAccountDetails: AccountTypes.AccountObject = await this.accountRepository.findAccountById({
      userId: userId,
      accountId: accountId,
    });
    if (!currentAccountDetails) {
      throw new AppError({
        statusCode: STATUS_CODES.internalServerError.code,
        message: STATUS_CODES.internalServerError.message,
      });
    }
    await this.accountRepository.updateAccount({
      userId: userId,
      accountId: currentAccountDetails._id,
      accountName: accountName,
      createdAt: currentAccountDetails.createdAt,
      balance: currentAccountDetails.balance,
      totalIncome: currentAccountDetails.totalIncome,
      totalExpense: currentAccountDetails.totalExpense,
    });
    return;
  }

  public async deleteAccount({ userId, accountId }: AccountTypes.Service.DeleteAccountParams): Promise<void> {
    const relatedTransactions: TransactionTypes.TransactionObject[] =
      await this.transactionRepository.findTransactionsByAccountId({ userId: userId, accountId: accountId });
    if (relatedTransactions.length > 0) {
      throw new AppError({
        statusCode: STATUS_CODES.conflict.code,
        message: "account.error.deleteTransactionsFirst",
      });
    }
    await this.accountRepository.deleteAccount({ userId: userId, accountId: accountId });
    return;
  }
}

export default AccountService;
