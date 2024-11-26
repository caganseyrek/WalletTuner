import AccountRepository from "@/repositories/accountRepository";
import TransactionRepository from "@/repositories/transactionRepository";

import AppError from "@/utils/errorHandler";
import statusCodes from "@/utils/statusCodes";

import AccountTypes from "@/types/account";
import TransactionTypes from "@/types/transactions";

class AccountService {
  private accountRepository: AccountRepository;
  private transactionRepository: TransactionRepository;

  constructor() {
    this.accountRepository = new AccountRepository();
    this.transactionRepository = new TransactionRepository();
  }

  async getAccounts({
    currentUser,
  }: AccountTypes.Services.GetAccountsParams): Promise<AccountTypes.Global.AccountDetails[]> {
    const accounts: AccountTypes.Global.AccountDetails[] = await this.accountRepository.findAccountByUserId({
      currentUser: currentUser,
    });
    if (!accounts || accounts.length === 0) {
      throw new AppError({
        statusCode: statusCodes.notFound,
        messageKey: "account.error.noAccountsFound",
      });
    }
    return accounts;
  }

  async createAccount({ currentUser, accountName }: AccountTypes.Services.CreateAccountParams): Promise<void> {
    const doesAccountExists: AccountTypes.Global.AccountDetails[] = await this.accountRepository.findAccountByUserId({
      currentUser: currentUser,
    });
    if (doesAccountExists.length > 0) {
      throw new AppError({
        statusCode: statusCodes.conflict,
        messageKey: "account.error.accountExists",
      });
    }
    await this.accountRepository.createAccount({
      currentUser: currentUser,
      accountName: accountName,
    });
    return;
  }

  async updateAccount({
    currentUser,
    accountId,
    accountName,
  }: AccountTypes.Services.UpdateAccountParams): Promise<void> {
    const doesAccountExists: AccountTypes.Global.AccountDetails[] = await this.accountRepository.findAccountByName({
      currentUser: currentUser,
      accountName: accountName,
    });
    if (doesAccountExists.length > 0) {
      throw new AppError({
        statusCode: statusCodes.conflict,
        messageKey: "account.error.accountExists",
      });
    }
    const currentAccountDetails: AccountTypes.Global.AccountDetails = await this.accountRepository.findAccountById({
      currentUser: currentUser,
      accountId: accountId,
    });
    if (!currentAccountDetails) {
      throw new AppError({
        statusCode: statusCodes.internalServerError,
        messageKey: "statusMessages.internalError",
      });
    }
    await this.accountRepository.updateAccount({
      currentUser: currentUser,
      accountId: currentAccountDetails._id,
      accountName: accountName,
      createdAt: currentAccountDetails.createdAt,
      balance: currentAccountDetails.balance,
      totalIncome: currentAccountDetails.totalIncome,
      totalExpense: currentAccountDetails.totalExpense,
    });
    return;
  }

  async deleteAccount({ currentUser, accountId }: AccountTypes.Services.DeleteAccountParams): Promise<void> {
    const relatedTransactions: TransactionTypes.Global.TransactionDetails[] =
      await this.transactionRepository.findTransactionByAccountId({
        currentUser: currentUser,
        accountId: accountId,
      });
    if (relatedTransactions.length > 0) {
      throw new AppError({
        statusCode: statusCodes.conflict,
        messageKey: "account.error.deleteTransactionsFirst",
      });
    }
    await this.accountRepository.deleteAccount({ currentUser: currentUser, accountId: accountId });
    return;
  }
}

export default AccountService;
