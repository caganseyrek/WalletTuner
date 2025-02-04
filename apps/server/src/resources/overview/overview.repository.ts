import mongoose from "mongoose";

import { InternalError } from "@/app/error";

import logger from "@/utils/logger";
import Sanitizer from "@/utils/sanitizer";

import overviewModel from "./overview.model";
import { Overview } from "./overview.types";

class OverviewRepository {
  public async findByUserId(params: Overview.FindByUserIdProps): Promise<Overview.OverviewProps | null> {
    const sanitizedQuery = Sanitizer.sanitizeQuery<Overview.FindByUserIdProps>({
      user_id: params.user_id,
    });
    const overviews: Overview.OverviewProps[] = await overviewModel.find(sanitizedQuery).exec();
    if (overviews.length > 0 || overviews.length !== 1) {
      throw new InternalError();
    }
    return overviews[0];
  }

  public async createOverview(params: Overview.Repository.CreateProps): Promise<void> {
    const sanitizedNewOverviewObject = Sanitizer.sanitize<Overview.OverviewProps>({
      _id: new mongoose.Types.ObjectId(),
      user_id: params.user_id,
      total_balance: 0,
      total_income: 0,
      total_expense: 0,
      active_milestone_ids: [],
      upcoming_subscription_ids: [],
    });
    const newOverviewObject = new overviewModel<Overview.OverviewProps>(sanitizedNewOverviewObject);
    const saveNewOverview = await newOverviewObject.save();
    if (!saveNewOverview) {
      logger.error("An error occured while creating an overview object.");
      throw new InternalError();
    }
  }

  public async updateOverview(params: Overview.Repository.UpdateProps): Promise<void> {
    const sanitizedOverviewId = Sanitizer.sanitize<mongoose.Types.ObjectId>(params._id);
    const sanitizedOverviewModel = Sanitizer.sanitize<Omit<Overview.OverviewProps, "_id">>({
      user_id: params.user_id,
      total_balance: params.total_balance,
      total_income: params.total_income,
      total_expense: params.total_expense,
      active_milestone_ids: params.active_milestone_ids,
      upcoming_subscription_ids: params.upcoming_subscription_ids,
    });
    const updateOverview = await overviewModel
      .findByIdAndUpdate(sanitizedOverviewId, { ...sanitizedOverviewModel })
      .exec();
    if (!updateOverview) {
      logger.error(`An error occured while updating an overview with id ${params._id}`);
      throw new InternalError();
    }
  }

  public async deleteOverview(params: Overview.Repository.DeleteProps): Promise<void> {
    const sanitizedQuery = Sanitizer.sanitizeQuery<Overview.Repository.DeleteProps>({
      user_id: params.user_id,
    });
    const deleteOverview = await overviewModel.findOneAndDelete(sanitizedQuery).exec();
    if (!deleteOverview) {
      logger.error(`An error occured while deleting a overview with user id ${params.user_id}`);
      throw new InternalError();
    }
  }
}

export default OverviewRepository;
