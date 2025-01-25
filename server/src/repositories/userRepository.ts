import mongoose from "mongoose";

import userModel from "@/models/userModel";

import STATUS_CODES from "@/utils/constants/statusCodes";
import AppError from "@/utils/helpers/errorHelper";
import logger from "@/utils/logger";
import Sanitizer from "@/utils/sanitizer";

import UserTypes from "@/types/user";

class UserRepository {
  async findById({ userId }: UserTypes.Repository.FindUserById): Promise<UserTypes.UserObject | null> {
    const sanitizedQuery = Sanitizer.sanitizeValue(userId);
    const user: UserTypes.UserObject = await userModel.findById(sanitizedQuery).exec();
    return user;
  }

  async findWithSettingsById({
    userId,
  }: UserTypes.Repository.FindSettingsByIdParams): Promise<UserTypes.Settings.UserWithSettingsObject | null> {
    const sanitizedQuery = Sanitizer.sanitizeValue(userId);
    const user: UserTypes.Settings.UserWithSettingsObject = await userModel.findById(sanitizedQuery).exec();
    return user;
  }

  async findByEmail({ email }: UserTypes.Repository.FindUserByEmailParams): Promise<UserTypes.UserObject[]> {
    const sanitizedQuery = Sanitizer.sanitizeQuery({ email: email });
    const users: UserTypes.UserObject[] = await userModel.find(sanitizedQuery).exec();
    return users;
  }

  async createNewUser({
    name,
    surname,
    email,
    password,
  }: UserTypes.Repository.CreateUserParams): Promise<UserTypes.UserObject> {
    const sanitizedNewUserObject = Sanitizer.sanitizeObject<UserTypes.Settings.UserWithSettingsObject>({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      surname: surname,
      email: email,
      password: password,
      preferredFormat: "en-US",
      preferredCurrency: "USD",
      preferredCurrencyDisplay: "narrowSymbol",
    });
    const newUserObject = new userModel<UserTypes.Settings.UserWithSettingsObject>(sanitizedNewUserObject);
    const saveNewUser = await newUserObject.save();
    if (!saveNewUser) {
      logger.error(`An error occured while saving a new user with email ${email}`);
      throw new AppError({
        statusCode: STATUS_CODES.internalServerError.code,
        message: STATUS_CODES.internalServerError.message,
      });
    }
    return newUserObject;
  }

  async updateUser({
    userId,
    name,
    surname,
    email,
    preferredFormat,
    preferredCurrency,
    preferredCurrencyDisplay,
  }: UserTypes.Repository.UpdateUserParams): Promise<void> {
    const sanitizedUserId = Sanitizer.sanitizeValue(userId);
    const sanitizedUserModel = Sanitizer.sanitizeObject<object>({
      name: name,
      surname: surname,
      email: email,
      preferredFormat: preferredFormat,
      preferredCurrency: preferredCurrency,
      preferredCurrencyDisplay: preferredCurrencyDisplay,
    });
    const updateUser = await userModel.findByIdAndUpdate(sanitizedUserId, { ...sanitizedUserModel });
    if (!updateUser) {
      throw new AppError({
        statusCode: STATUS_CODES.internalServerError.code,
        message: STATUS_CODES.internalServerError.message,
      });
    }
    return;
  }

  async deleteUser({ userId }: UserTypes.Repository.DeleteUserParams): Promise<void> {
    const sanitizedQuery = Sanitizer.sanitizeValue(userId);
    const deleteUser = await userModel.findByIdAndDelete(sanitizedQuery).exec();
    if (!deleteUser) {
      throw new AppError({
        statusCode: STATUS_CODES.internalServerError.code,
        message: STATUS_CODES.internalServerError.message,
      });
    }
    return;
  }
}

export default UserRepository;
