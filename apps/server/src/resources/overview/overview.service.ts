import { Account, Milestone, Overview, Subscription } from "@wallettuner/resource-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { BadRequestError, NotFoundError } from "@/app/error/errors";

import OverviewRepository from "@/resources/overview/overview.repository";

import AccountRepository from "../account/account.repository";
import MilestoneRepository from "../milestone/milestone.repository";
import SubscriptionRepository from "../subscription/subscription.repository";

dayjs.extend(relativeTime);

class OverviewService {
  private overviewRepository: OverviewRepository;
  private accountRepository: AccountRepository;
  private milestoneRepository: MilestoneRepository;
  private subscriptionRepository: SubscriptionRepository;

  constructor() {
    this.overviewRepository = new OverviewRepository();
    this.accountRepository = new AccountRepository();
    this.milestoneRepository = new MilestoneRepository();
    this.subscriptionRepository = new SubscriptionRepository();
  }

  public async getOverview(params: Overview.FindByUserIdProps): Promise<Overview.OverviewProps> {
    const overviews: Overview.OverviewProps | null = await this.overviewRepository.findByUserId({
      user_id: params.user_id,
    });
    if (!overviews) {
      throw new NotFoundError();
    }
    return overviews;
  }

  public async createOverview(params: Overview.Service.CreateProps): Promise<void> {
    await this.overviewRepository.createOverview({ user_id: params.user_id });
  }

  public async updateOverview(params: Overview.Service.UpdateProps): Promise<void> {
    const currentOverviewDetails: Overview.OverviewProps | null = await this.overviewRepository.findByUserId({
      user_id: params.user_id,
    });
    if (!currentOverviewDetails) {
      throw new BadRequestError();
    }
    let totalBalance: number = 0;
    let totalIncome: number = 0;
    let totalExpense: number = 0;
    const accounts: Account.AccountProps[] = await this.accountRepository.findByUserId({ user_id: params.user_id });
    accounts.forEach((account) => {
      totalBalance += account.balance;
      totalIncome += account.total_income;
      totalExpense += account.total_expense;
    });
    const milestones: Milestone.MilestoneProps[] = await this.milestoneRepository.findByUserId({
      user_id: params.user_id,
    });
    const subscriptions: Subscription.SubscriptionProps[] = await this.subscriptionRepository.findByUserId({
      user_id: params.user_id,
    });
    await this.overviewRepository.updateOverview({
      _id: currentOverviewDetails._id,
      user_id: params.user_id,
      total_balance: totalBalance,
      total_income: totalIncome,
      total_expense: totalExpense,
      active_milestone_ids: [
        ...milestones
          .filter(
            (milestone) => dayjs(milestone.end_date).isAfter(dayjs()) && dayjs(milestone.start_date).isAfter(dayjs()),
          )
          .map((milestone) => milestone._id),
      ],
      upcoming_subscription_ids: [
        ...subscriptions
          .filter(
            (subscription) =>
              dayjs(subscription.next_payment_date).isBefore(dayjs()) &&
              dayjs(subscription.next_payment_date).diff(dayjs(), "days") <= 31,
          )
          .map((subscription) => subscription._id),
      ],
    });
  }

  public async deleteOverview(params: Overview.Service.DeleteProps): Promise<void> {
    await this.overviewRepository.deleteOverview({ user_id: params.user_id });
  }
}

export default OverviewService;
