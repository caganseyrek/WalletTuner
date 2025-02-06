import { BadRequestError, NotFoundError } from "@/app/errors/errors";

import AccountRepository from "@/resources/account/account.repository";
import MilestoneRepository from "@/resources/milestone/milestone.repository";

import ProgressHelper from "@/helpers/progressHelper";

import { Account } from "../account/account.types";
import { Milestone } from "./milestone.types";

class MilestoneService {
  private milestoneRepository: MilestoneRepository;
  private accountRepository: AccountRepository;

  constructor() {
    this.milestoneRepository = new MilestoneRepository();
    this.accountRepository = new AccountRepository();
  }

  public async getMilestones(params: Milestone.FindByUserIdProps): Promise<Milestone.MilestoneProps[]> {
    const milestones: Milestone.MilestoneProps[] = await this.milestoneRepository.findByUserId({
      user_id: params.user_id,
    });
    if (!milestones) {
      throw new NotFoundError();
    }
    return milestones;
  }

  public async createMilestone(params: Milestone.Service.CreateProps): Promise<void> {
    const accountDetails: Account.AccountProps | null = await this.accountRepository.findById({
      _id: params.account_id,
      user_id: params.user_id,
    });
    if (!accountDetails) {
      throw new BadRequestError();
    }
    const progress: number = ProgressHelper.calculateProgress({
      accountBalance: accountDetails.balance,
      targetAmount: params.target_amount,
    });
    await this.milestoneRepository.createMilestone({
      user_id: params.user_id,
      account_id: accountDetails._id,
      name: params.name,
      target_amount: params.target_amount,
      progress: progress,
      start_date: params.start_date,
      end_date: params.end_date,
      status: params.status,
    });
  }

  public async updateMilestone(params: Milestone.Service.UpdateProps): Promise<void> {
    const currentMilestoneDetails: Milestone.MilestoneProps | null = await this.milestoneRepository.findById({
      _id: params._id,
      user_id: params.user_id,
    });
    const accountDetails: Account.AccountProps | null = await this.accountRepository.findById({
      _id: params._id,
      user_id: params.user_id,
    });
    if (!currentMilestoneDetails || !accountDetails) {
      throw new BadRequestError();
    }
    const progress: number = ProgressHelper.calculateProgress({
      accountBalance: accountDetails.balance,
      targetAmount: params.target_amount,
    });
    await this.milestoneRepository.updateMilestone({
      _id: currentMilestoneDetails._id,
      user_id: params.user_id,
      account_id: params._id,
      name: params.name,
      target_amount: params.target_amount,
      progress: progress,
      start_date: params.start_date,
      end_date: params.end_date,
      status: params.status,
    });
  }

  public async deleteMilestone(params: Milestone.Service.DeleteProps): Promise<void> {
    const milestoneDetails: Milestone.MilestoneProps | null = await this.milestoneRepository.findById({
      _id: params._id,
      user_id: params.user_id,
    });
    if (!milestoneDetails) {
      throw new BadRequestError();
    }
    const accountDetails: Account.AccountProps | null = await this.accountRepository.findById({
      _id: milestoneDetails.account_id,
      user_id: params._id,
    });
    if (!accountDetails) {
      throw new BadRequestError();
    }
    await this.milestoneRepository.deleteMilestone({
      _id: params._id,
      user_id: params.user_id,
    });
  }
}

export default MilestoneService;
