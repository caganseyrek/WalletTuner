import mongoose from "mongoose";

import { InternalError } from "@/app/errors/errors";

import logger from "@/utils/logger";
import Sanitizer from "@/utils/sanitizer";

import subscriptionModel from "./subscription.model";
import { Subscription } from "./subscription.types";

class SubscriptionRepository {
  public async findByAccountName(params: Subscription.FindByAccountProps): Promise<Subscription.SubscriptionProps[]> {
    const sanitizedQuery = Sanitizer.sanitizeQuery<Subscription.FindByAccountProps>({
      user_id: params.user_id,
      paid_from: params.paid_from,
    });
    const subscriptions: Subscription.SubscriptionProps[] = await subscriptionModel.find(sanitizedQuery).exec();
    return subscriptions;
  }

  public async findById(params: Subscription.FindByIdProps): Promise<Subscription.SubscriptionProps | null> {
    const sanitizedQuery = Sanitizer.sanitizeQuery<Subscription.FindByIdProps>({
      _id: params._id,
      user_id: params.user_id,
    });
    const subscriptions: Subscription.SubscriptionProps | null = await subscriptionModel.findOne(sanitizedQuery).exec();
    return subscriptions;
  }

  public async findByUserId(params: Subscription.FindByUserIdProps): Promise<Subscription.SubscriptionProps[]> {
    const sanitizedQuery = Sanitizer.sanitizeQuery<Subscription.FindByUserIdProps>({
      user_id: params.user_id,
    });
    const subscriptions: Subscription.SubscriptionProps[] = await subscriptionModel.find(sanitizedQuery).exec();
    return subscriptions;
  }

  public async createSubscription(params: Subscription.Repository.CreateProps): Promise<void> {
    const sanitizedNewSubscriptionObject = Sanitizer.sanitize<Subscription.SubscriptionProps>({
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
    const newSubscriptionObject = new subscriptionModel<Subscription.SubscriptionProps>(sanitizedNewSubscriptionObject);
    const saveNewSubscription = await newSubscriptionObject.save();
    if (!saveNewSubscription) {
      logger.error(`An error occured while saving a new subscription that belongs to user id ${params.user_id}`);
      throw new InternalError();
    }
  }

  public async updateSubscription(params: Subscription.Repository.UpdateProps): Promise<void> {
    const sanitizedSubscriptionId = Sanitizer.sanitize<mongoose.Types.ObjectId>(params._id);
    const sanitizedSubscriptionModel = Sanitizer.sanitize<Omit<Subscription.SubscriptionProps, "_id">>({
      user_id: params.user_id,
      name: params.name,
      amount: params.amount,
      billing_cycle: params.billing_cycle,
      next_payment_date: params.next_payment_date,
      paid_from: params.paid_from,
      is_active: params.is_active,
      created_at: params.created_at,
    });
    const updateSubscription = await subscriptionModel
      .findByIdAndUpdate(sanitizedSubscriptionId, { ...sanitizedSubscriptionModel })
      .exec();
    if (!updateSubscription) {
      logger.error(`An error occured while updating a subscription with id ${params._id}`);
      throw new InternalError();
    }
  }

  public async deleteSubscription(params: Subscription.Repository.DeleteProps): Promise<void> {
    const sanitizedQuery = Sanitizer.sanitizeQuery<Subscription.Repository.DeleteProps>({
      _id: params._id,
      user_id: params.user_id,
    });
    const deleteSubscription = await subscriptionModel.findOneAndDelete(sanitizedQuery).exec();
    if (!deleteSubscription) {
      logger.error(`An error occured while deleting a subscription with id ${params._id}`);
      throw new InternalError();
    }
  }
}

export default SubscriptionRepository;
