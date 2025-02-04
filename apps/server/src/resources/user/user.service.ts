import { NotFoundError } from "@/app/error";

import AccountRepository from "@/resources/account/account.repository";
import UserRepository from "@/resources/user/user.repository";

import { Account } from "../account/account.types";
import MilestoneRepository from "../milestone/milestone.repository";
import { Milestone } from "../milestone/milestone.types";
import OverviewRepository from "../overview/overview.repository";
import { Overview } from "../overview/overview.types";
import SubscriptionRepository from "../subscription/subscription.repository";
import { Subscription } from "../subscription/subscription.types";
import TransactionRepository from "../transaction/transaction.repository";
import { Transaction } from "../transaction/transaction.types";
import { User } from "./user.types";
import PasswordHelper from "@/helpers/passwordHelper";

class UserService {
  private userRepository: UserRepository;
  private accountRepository: AccountRepository;
  private milestoneRepository: MilestoneRepository;
  private overviewRepository: OverviewRepository;
  private subscriptionRepository: SubscriptionRepository;
  private transactionRepository: TransactionRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.accountRepository = new AccountRepository();
    this.milestoneRepository = new MilestoneRepository();
    this.overviewRepository = new OverviewRepository();
    this.subscriptionRepository = new SubscriptionRepository();
    this.transactionRepository = new TransactionRepository();
  }

  public async getUser(params: User.FindByEmailProps): Promise<User.UserProps> {
    const users: User.UserProps = await this.userRepository.findByEmail({ email: params.email });
    if (!users) {
      throw new NotFoundError();
    }
    return users;
  }

  public async createUser(params: User.Service.CreateProps): Promise<void> {
    const hashedPassword: string = await PasswordHelper.hash(params.password_hash);
    await this.userRepository.createUser({
      full_name: params.full_name,
      email: params.email,
      password_hash: hashedPassword,
      created_at: new Date().toISOString(),
    });
  }

  public async updateUser(params: User.Service.UpdateProps): Promise<void> {
    await this.userRepository.updateUser({ full_name: params.full_name, _id: params._id });
  }

  public async deleteUser(params: User.Service.DeleteProps): Promise<void> {
    const accounts: Account.AccountProps[] = await this.accountRepository.findByUserId({
      user_id: params._id,
    });
    if (accounts.length > 0) {
      accounts.forEach(async (account) => {
        await this.accountRepository.deleteAccount({ _id: account._id, user_id: params._id });
      });
    }
    const milestones: Milestone.MilestoneProps[] = await this.milestoneRepository.findByUserId({
      user_id: params._id,
    });
    if (milestones.length > 0) {
      milestones.forEach(async (milestone) => {
        await this.milestoneRepository.deleteMilestone({ _id: milestone._id, user_id: params._id });
      });
    }
    const overview: Overview.OverviewProps | null = await this.overviewRepository.findByUserId({
      user_id: params._id,
    });
    if (overview) {
      await this.overviewRepository.deleteOverview({ user_id: params._id });
    }
    const subscriptions: Subscription.SubscriptionProps[] = await this.subscriptionRepository.findByUserId({
      user_id: params._id,
    });
    if (subscriptions.length > 0) {
      subscriptions.forEach(async (subscription) => {
        this.subscriptionRepository.deleteSubscription({ _id: subscription._id, user_id: params._id });
      });
    }
    const transactions: Transaction.TransactionProps[] = await this.transactionRepository.findByUserId({
      user_id: params._id,
    });
    if (transactions.length > 0) {
      transactions.forEach(async (transaction) => {
        this.transactionRepository.deleteTransaction({ _id: transaction._id, user_id: params._id });
      });
    }
    await this.userRepository.deleteUser({ _id: params._id });
  }
}

export default UserService;
