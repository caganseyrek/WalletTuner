import { Milestone } from "@wallettuner/resource-types";
import mongoose from "mongoose";

import { InternalError } from "@/app/errors/errors";

import logger from "@/utils/logger";
import Sanitizer from "@/utils/sanitizer";

import milestoneModel from "./milestone.model";

class MilestoneRepository {
  public async findByAccountName(params: Milestone.FindByAccountProps): Promise<Milestone.MilestoneProps[]> {
    const sanitizedQuery = Sanitizer.sanitizeQuery<Milestone.FindByAccountProps>({
      user_id: params.user_id,
      account_id: params.account_id,
    });
    const milestones: Milestone.MilestoneProps[] = await milestoneModel.find(sanitizedQuery).exec();
    return milestones;
  }

  public async findById(params: Milestone.FindByIdProps): Promise<Milestone.MilestoneProps | null> {
    const sanitizedQuery = Sanitizer.sanitizeQuery<Milestone.FindByIdProps>({
      _id: params._id,
      user_id: params.user_id,
    });
    const milestones: Milestone.MilestoneProps | null = await milestoneModel.findOne(sanitizedQuery).exec();
    return milestones;
  }

  public async findByUserId(params: Milestone.FindByUserIdProps): Promise<Milestone.MilestoneProps[]> {
    const sanitizedQuery = Sanitizer.sanitizeQuery<Milestone.FindByUserIdProps>({
      user_id: params.user_id,
    });
    const milestones: Milestone.MilestoneProps[] = await milestoneModel.find(sanitizedQuery).exec();
    return milestones;
  }

  public async createMilestone(params: Milestone.Repository.CreateProps): Promise<void> {
    const sanitizedNewMilestoneObject = Sanitizer.sanitize<Milestone.MilestoneProps>({
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
    const newMilestoneObject = new milestoneModel<Milestone.MilestoneProps>(sanitizedNewMilestoneObject);
    const saveNewMilestone = await newMilestoneObject.save();
    if (!saveNewMilestone) {
      logger.error(`An error occured while saving a new milestone that belongs to user id ${params.user_id}`);
      throw new InternalError();
    }
  }

  public async updateMilestone(params: Milestone.Repository.UpdateProps): Promise<void> {
    const sanitizedMilestoneId = Sanitizer.sanitize<mongoose.Types.ObjectId>(params._id);
    const sanitizedMilestoneModel = Sanitizer.sanitize<Omit<Milestone.MilestoneProps, "_id">>({
      user_id: params.user_id,
      account_id: params.account_id,
      name: params.name,
      target_amount: params.target_amount,
      progress: params.progress,
      start_date: params.start_date,
      end_date: params.end_date,
      status: params.status,
    });
    const updateMilestone = await milestoneModel
      .findByIdAndUpdate(sanitizedMilestoneId, { ...sanitizedMilestoneModel })
      .exec();
    if (!updateMilestone) {
      logger.error(`An error occured while updating a milestone with id ${params._id}`);
      throw new InternalError();
    }
  }

  public async deleteMilestone(params: Milestone.Repository.DeleteProps): Promise<void> {
    const sanitizedQuery = Sanitizer.sanitizeQuery<Milestone.Repository.DeleteProps>({
      _id: params._id,
      user_id: params.user_id,
    });
    const deleteMilestone = await milestoneModel.findOneAndDelete(sanitizedQuery).exec();
    if (!deleteMilestone) {
      logger.error(`An error occured while deleting a milestone with id ${params._id}`);
      throw new InternalError();
    }
  }
}

export default MilestoneRepository;
