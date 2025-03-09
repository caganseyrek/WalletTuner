import { Subscription } from "@wallettuner/resource-types";
import mongoose from "mongoose";

import { InternalError } from "@/app/error/errors";

import logger from "@/utils/logger";

import subscriptionModel from "./subscription.model";

class SubscriptionRepository {
  public async findByAccountName(params: Subscription.FindByAccountProps): Promise<Subscription.SubscriptionProps[]> {
    const subscriptions: Subscription.SubscriptionProps[] = await subscriptionModel
      .find({ user_id: params.user_id, paid_from: params.paid_from })
      .exec();
    return subscriptions;
  }

  public async findById(params: Subscription.FindByIdProps): Promise<Subscription.SubscriptionProps | null> {
    const subscriptions: Subscription.SubscriptionProps | null = await subscriptionModel
      .findOne({ _id: params._id, user_id: params.user_id })
      .exec();
    return subscriptions;
  }

  public async findByUserId(params: Subscription.FindByUserIdProps): Promise<Subscription.SubscriptionProps[]> {
    const subscriptions: Subscription.SubscriptionProps[] = await subscriptionModel
      .find({ user_id: params.user_id })
      .exec();
    return subscriptions;
  }

  public async createSubscription(params: Subscription.Repository.CreateProps): Promise<void> {
    const newSubscriptionObject = new subscriptionModel<Subscription.SubscriptionProps>({
      _id: new mongoose.Types.ObjectId(),
      user_id: params.user_id,
      name: params.name,
      amount: params.amount,
      billing_cycle: params.billing_cycle,
      next_payment_date: params.next_payment_date,
      paid_from: params.paid_from,
      is_active: params.is_active,
      created_at: new Date().toISOString(),
    });
    const saveNewSubscription = await newSubscriptionObject.save();
    if (!saveNewSubscription) {
      logger.error(`An error occured while saving a new subscription that belongs to user id ${params.user_id}`);
      throw new InternalError();
    }
  }

  public async updateSubscription(params: Subscription.Repository.UpdateProps): Promise<void> {
    const updateSubscription = await subscriptionModel
      .findByIdAndUpdate(params._id, {
        user_id: params.user_id,
        name: params.name,
        amount: params.amount,
        billing_cycle: params.billing_cycle,
        next_payment_date: params.next_payment_date,
        paid_from: params.paid_from,
        is_active: params.is_active,
        created_at: params.created_at,
      })
      .exec();
    if (!updateSubscription) {
      logger.error(`An error occured while updating a subscription with id ${params._id}`);
      throw new InternalError();
    }
  }

  public async deleteSubscription(params: Subscription.Repository.DeleteProps): Promise<void> {
    const deleteSubscription = await subscriptionModel
      .findOneAndDelete({ _id: params._id, user_id: params.user_id })
      .exec();
    if (!deleteSubscription) {
      logger.error(`An error occured while deleting a subscription with id ${params._id}`);
      throw new InternalError();
    }
  }
}

export default SubscriptionRepository;
