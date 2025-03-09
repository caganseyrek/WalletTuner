import { User } from "@wallettuner/resource-types";
import mongoose from "mongoose";

import { InternalError } from "@/app/error/errors";

import userModel from "@/resources/auth/user/user.model";

import logger from "@/utils/logger";

class UserRepository {
  public async findById(params: User.FindByIdProps): Promise<User.UserProps | null> {
    const user: User.UserProps | null = await userModel.findOne({ _id: params._id }).exec();
    return user;
  }

  public async findByEmail({ email }: User.FindByEmailProps): Promise<User.UserProps> {
    const users: User.UserProps[] = await userModel.find({ email: email }).exec();
    if (users.length < 1 || users.length === 0) {
      throw new InternalError();
    }
    return users[0];
  }

  public async createUser(params: User.Repository.CreateProps): Promise<void> {
    const newUserObject = new userModel<User.UserProps>({
      _id: new mongoose.Types.ObjectId(),
      full_name: params.full_name,
      email: params.email,
      password: params.password,
      created_at: params.created_at,
    });
    const saveNewUser = await newUserObject.save();
    if (!saveNewUser) {
      logger.error(`An error occured while saving a new user that belongs to user id ${newUserObject._id}`);
      throw new InternalError();
    }
  }

  public async updateUser(params: User.Repository.UpdateProps): Promise<void> {
    const updateUser = await userModel.findByIdAndUpdate(params._id, { full_name: params.full_name }).exec();
    if (!updateUser) {
      logger.error(`An error occured while updating a user with id ${params._id}`);
      throw new InternalError();
    }
  }

  public async deleteUser(params: User.Repository.DeleteProps): Promise<void> {
    const deleteUser = await userModel.findOneAndDelete({ _id: params._id }).exec();
    if (!deleteUser) {
      logger.error(`An error occured while deleting a user with id ${params._id}`);
      throw new InternalError();
    }
  }
}

export default UserRepository;
