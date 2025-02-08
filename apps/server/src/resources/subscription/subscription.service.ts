import { Account, Subscription } from "@wallettuner/resource-types";

import { BadRequestError, NotFoundError } from "@/app/errors/errors";

import AccountRepository from "@/resources/account/account.repository";
import SubscriptionRepository from "@/resources/subscription/subscription.repository";

class SubscriptionService {
  private subscriptionRepository: SubscriptionRepository;
  private accountRepository: AccountRepository;

  constructor() {
    this.subscriptionRepository = new SubscriptionRepository();
    this.accountRepository = new AccountRepository();
  }

  public async getSubscriptions(params: Subscription.FindByUserIdProps): Promise<Subscription.SubscriptionProps[]> {
    const subscriptions: Subscription.SubscriptionProps[] = await this.subscriptionRepository.findByUserId({
      user_id: params.user_id,
    });
    if (!subscriptions) {
      throw new NotFoundError();
    }
    return subscriptions;
  }

  public async createSubscription(params: Subscription.Service.CreateProps): Promise<void> {
    const accountDetails: Account.AccountProps | null = await this.accountRepository.findById({
      _id: params.paid_from,
      user_id: params.user_id,
    });
    if (!accountDetails) {
      throw new BadRequestError();
    }
    await this.subscriptionRepository.createSubscription({
      user_id: params.user_id,
      name: params.name,
      amount: params.amount,
      billing_cycle: params.billing_cycle,
      next_payment_date: params.next_payment_date,
      paid_from: accountDetails._id,
      is_active: params.is_active,
    });
  }

  public async updateSubscription(params: Subscription.Service.UpdateProps): Promise<void> {
    const currentSubscriptionDetails: Subscription.SubscriptionProps | null =
      await this.subscriptionRepository.findById({
        _id: params._id,
        user_id: params.user_id,
      });
    const accountDetails: Account.AccountProps | null = await this.accountRepository.findById({
      _id: params._id,
      user_id: params.user_id,
    });
    if (!currentSubscriptionDetails || !accountDetails) {
      throw new BadRequestError();
    }
    await this.subscriptionRepository.updateSubscription({
      _id: currentSubscriptionDetails._id,
      user_id: params.user_id,
      name: params.name,
      amount: params.amount,
      billing_cycle: params.billing_cycle,
      next_payment_date: params.next_payment_date,
      paid_from: params.paid_from,
      is_active: params.is_active,
      created_at: currentSubscriptionDetails.created_at,
    });
  }

  public async deleteSubscription(params: Subscription.Service.DeleteProps): Promise<void> {
    const subscriptionDetails: Subscription.SubscriptionProps | null = await this.subscriptionRepository.findById({
      _id: params._id,
      user_id: params.user_id,
    });
    if (!subscriptionDetails) {
      throw new BadRequestError();
    }
    const accountDetails: Account.AccountProps | null = await this.accountRepository.findById({
      _id: subscriptionDetails.paid_from,
      user_id: params._id,
    });
    if (!accountDetails) {
      throw new BadRequestError();
    }
    await this.subscriptionRepository.deleteSubscription({
      _id: params._id,
      user_id: params.user_id,
    });
  }
}

export default SubscriptionService;
