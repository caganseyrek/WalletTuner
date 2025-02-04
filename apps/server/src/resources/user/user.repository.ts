import mongoose from "mongoose";

import { InternalError } from "@/app/error";

import userModel from "@/resources/user/user.model";

import logger from "@/utils/logger";
import Sanitizer from "@/utils/sanitizer";

import { User } from "./user.types";

class UserRepository {
  public async findById(params: User.FindByIdProps): Promise<User.UserProps | null> {
    const sanitizedQuery = Sanitizer.sanitizeQuery<User.FindByIdProps>({ _id: params._id });
    const user: User.UserProps | null = await userModel.findOne(sanitizedQuery).exec();
    return user;
  }

  public async findByEmail(params: User.FindByEmailProps): Promise<User.UserProps> {
    const sanitizedQuery = Sanitizer.sanitizeQuery<User.FindByEmailProps>({ email: params.email });
    const users: User.UserProps[] = await userModel.find(sanitizedQuery).exec();
    if (users.length > 0) {
      throw new InternalError();
    }
    return users[0];
  }

  public async createUser(params: User.Repository.CreateProps): Promise<void> {
    const sanitizedNewUserObject = Sanitizer.sanitize<User.UserProps>({
      _id: new mongoose.Types.ObjectId(),
      full_name: params.full_name,
      email: params.email,
      password_hash: params.password_hash,
      created_at: params.created_at,
    });
    const newUserObject = new userModel<User.UserProps>(sanitizedNewUserObject);
    const saveNewUser = await newUserObject.save();
    if (!saveNewUser) {
      logger.error(`An error occured while saving a new user that belongs to user id ${sanitizedNewUserObject._id}`);
      throw new InternalError();
    }
    return saveNewUser;
  }

  public async updateUser(params: User.Repository.UpdateProps): Promise<void> {
    const sanitizedUserId = Sanitizer.sanitize<mongoose.Types.ObjectId>(params._id);
    const sanitizedUserModel = Sanitizer.sanitize<Omit<User.Repository.UpdateProps, "_id">>({
      full_name: params.full_name,
    });
    const updateUser = await userModel.findByIdAndUpdate(sanitizedUserId, { ...sanitizedUserModel }).exec();
    if (!updateUser) {
      logger.error(`An error occured while updating a user with id ${params._id}`);
      throw new InternalError();
    }
  }

  public async deleteUser(params: User.Repository.DeleteProps): Promise<void> {
    const sanitizedQuery = Sanitizer.sanitizeQuery<User.Repository.DeleteProps>({ _id: params._id });
    const deleteUser = await userModel.findOneAndDelete(sanitizedQuery).exec();
    if (!deleteUser) {
      logger.error(`An error occured while deleting a user with id ${params._id}`);
      throw new InternalError();
    }
  }
}

export default UserRepository;
