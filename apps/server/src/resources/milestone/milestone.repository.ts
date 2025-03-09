import { Milestone } from "@wallettuner/resource-types";
import mongoose from "mongoose";

import { InternalError } from "@/app/error/errors";

import logger from "@/utils/logger";

import milestoneModel from "./milestone.model";

class MilestoneRepository {
  public async findByAccountName(params: Milestone.FindByAccountProps): Promise<Milestone.MilestoneProps[]> {
    const milestones: Milestone.MilestoneProps[] = await milestoneModel
      .find({ user_id: params.user_id, account_id: params.account_id })
      .exec();
    return milestones;
  }

  public async findById(params: Milestone.FindByIdProps): Promise<Milestone.MilestoneProps | null> {
    const milestones: Milestone.MilestoneProps | null = await milestoneModel
      .findOne({ _id: params._id, user_id: params.user_id })
      .exec();
    return milestones;
  }

  public async findByUserId(params: Milestone.FindByUserIdProps): Promise<Milestone.MilestoneProps[]> {
    const milestones: Milestone.MilestoneProps[] = await milestoneModel.find({ user_id: params.user_id }).exec();
    return milestones;
  }

  public async createMilestone(params: Milestone.Repository.CreateProps): Promise<void> {
    const newMilestoneObject = new milestoneModel<Milestone.MilestoneProps>({
      _id: new mongoose.Types.ObjectId(),
      user_id: params.user_id,
      account_id: params.account_id,
      name: params.name,
      target_amount: params.target_amount,
      progress: params.progress,
      start_date: params.start_date,
      end_date: params.end_date,
      status: params.status,
    });
    const saveNewMilestone = await newMilestoneObject.save();
    if (!saveNewMilestone) {
      logger.error(`An error occured while saving a new milestone that belongs to user id ${params.user_id}`);
      throw new InternalError();
    }
  }

  public async updateMilestone(params: Milestone.Repository.UpdateProps): Promise<void> {
    const updateMilestone = await milestoneModel
      .findByIdAndUpdate(params._id, {
        user_id: params.user_id,
        account_id: params.account_id,
        name: params.name,
        target_amount: params.target_amount,
        progress: params.progress,
        start_date: params.start_date,
        end_date: params.end_date,
        status: params.status,
      })
      .exec();
    if (!updateMilestone) {
      logger.error(`An error occured while updating a milestone with id ${params._id}`);
      throw new InternalError();
    }
  }

  public async deleteMilestone(params: Milestone.Repository.DeleteProps): Promise<void> {
    const deleteMilestone = await milestoneModel.findOneAndDelete({ _id: params._id, user_id: params.user_id }).exec();
    if (!deleteMilestone) {
      logger.error(`An error occured while deleting a milestone with id ${params._id}`);
      throw new InternalError();
    }
  }
}

export default MilestoneRepository;
