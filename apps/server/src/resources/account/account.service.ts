import { AppError, InternalError, NotFoundError } from "@/app/errors/errors";

import AccountRepository from "@/resources/account/account.repository";
import TransactionRepository from "@/resources/transaction/transaction.repository";

import STATUS_CODES from "@/constants/statusCodes";

import MilestoneRepository from "../milestone/milestone.repository";
import { Milestone } from "../milestone/milestone.types";
import SubscriptionRepository from "../subscription/subscription.repository";
import { Subscription } from "../subscription/subscription.types";
import { Transaction } from "../transaction/transaction.types";
import { Account } from "./account.types";

class AccountService {
  private accountRepository: AccountRepository;
  private milestoneRepository: MilestoneRepository;
  private subscription: SubscriptionRepository;
  private transactionRepository: TransactionRepository;

  constructor() {
    this.accountRepository = new AccountRepository();
    this.milestoneRepository = new MilestoneRepository();
    this.subscription = new SubscriptionRepository();
    this.transactionRepository = new TransactionRepository();
  }

  public async getAccounts(params: Account.FindByUserIdProps): Promise<Account.AccountProps[]> {
    const accounts: Account.AccountProps[] = await this.accountRepository.findByUserId({
      user_id: params.user_id,
    });
    if (!accounts || accounts.length === 0) {
      throw new NotFoundError();
    }
    return accounts;
  }

  public async createAccount(params: Account.Service.CreateProps): Promise<void> {
    const doesAccountExists: Account.AccountProps | null = await this.accountRepository.findByName({
      user_id: params.user_id,
      name: params.name,
    });
    if (doesAccountExists) {
      throw new NotFoundError();
    }
    await this.accountRepository.createAccount({ user_id: params.user_id, name: params.name });
  }

  public async updateAccount(params: Account.Service.UpdateProps): Promise<void> {
    const doesAccountExists: Account.AccountProps | null = await this.accountRepository.findByName({
      user_id: params.user_id,
      name: params.name,
    });
    const currentAccountDetails: Account.AccountProps | null = await this.accountRepository.findById({
      _id: params._id,
      user_id: params.user_id,
    });
    if (!doesAccountExists || !currentAccountDetails) {
      throw new InternalError();
    }
    await this.accountRepository.updateAccount({
      _id: currentAccountDetails._id,
      user_id: params.user_id,
      name: params.name,
      balance: currentAccountDetails.balance,
      total_income: currentAccountDetails.total_income,
      total_expense: currentAccountDetails.total_expense,
      created_at: currentAccountDetails.created_at,
    });
  }

  public async deleteAccount(params: Account.Service.DeleteProps): Promise<void> {
    const relatedMilestones: Milestone.MilestoneProps[] = await this.milestoneRepository.findByAccountName({
      account_id: params._id,
      user_id: params.user_id,
    });
    const relatedSubscriptions: Subscription.SubscriptionProps[] = await this.subscription.findByAccountName({
      paid_from: params._id,
      user_id: params.user_id,
    });
    const relatedTransactions: Transaction.TransactionProps[] = await this.transactionRepository.findByAccountId({
      account_id: params._id,
      user_id: params.user_id,
    });
    if (relatedMilestones.length > 0 || relatedSubscriptions.length > 0 || relatedTransactions.length > 0) {
      throw new AppError({
        statusCode: STATUS_CODES.conflict.code,
        message: "Delete resources associated with this account first.",
      });
    }
    await this.accountRepository.deleteAccount({ _id: params._id, user_id: params.user_id });
  }
}

export default AccountService;
