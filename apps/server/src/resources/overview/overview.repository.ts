import { Overview } from "@wallettuner/resource-types";
import mongoose from "mongoose";

import { InternalError } from "@/app/error/errors";

import logger from "@/utils/logger";

import overviewModel from "./overview.model";

class OverviewRepository {
  public async findByUserId(params: Overview.FindByUserIdProps): Promise<Overview.OverviewProps | null> {
    const overview: Overview.OverviewProps | null = await overviewModel.findOne({ user_id: params.user_id }).exec();
    if (!overview) {
      throw new InternalError();
    }
    return overview;
  }

  public async createOverview(params: Overview.Repository.CreateProps): Promise<void> {
    const newOverviewObject = new overviewModel<Overview.OverviewProps>({
      _id: new mongoose.Types.ObjectId(),
      user_id: params.user_id,
      total_balance: 0,
      total_income: 0,
      total_expense: 0,
      active_milestone_ids: [],
      upcoming_subscription_ids: [],
    });
    const saveNewOverview = await newOverviewObject.save();
    if (!saveNewOverview) {
      logger.error("An error occured while creating an overview object.");
      throw new InternalError();
    }
  }

  public async updateOverview(params: Overview.Repository.UpdateProps): Promise<void> {
    const updateOverview = await overviewModel
      .findByIdAndUpdate(params._id, {
        user_id: params.user_id,
        total_balance: params.total_balance,
        total_income: params.total_income,
        total_expense: params.total_expense,
        active_milestone_ids: params.active_milestone_ids,
        upcoming_subscription_ids: params.upcoming_subscription_ids,
      })
      .exec();
    if (!updateOverview) {
      logger.error(`An error occured while updating an overview with id ${params._id}`);
      throw new InternalError();
    }
  }

  public async deleteOverview(params: Overview.Repository.DeleteProps): Promise<void> {
    const deleteOverview = await overviewModel.findOneAndDelete({ user_id: params.user_id }).exec();
    if (!deleteOverview) {
      logger.error(`An error occured while deleting a overview with user id ${params.user_id}`);
      throw new InternalError();
    }
  }
}

export default OverviewRepository;
