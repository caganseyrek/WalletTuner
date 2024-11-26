import mongoose from "mongoose";

import userModel from "@/models/userModel";

import AppError from "@/utils/errorHandler";
import logger from "@/utils/logger";
import statusCodes from "@/utils/statusCodes";

import UserTypes from "@/types/user";

class UserRepository {
  /**
   * Finds a user by their ID.
   * @param FindByIdParams - The ID of the user to find.
   * @returns A user object if found, otherwise null.
   */
  async findById({ currentUser }: UserTypes.FindByIdParams): Promise<UserTypes.UserDetails | null> {
    const user: UserTypes.UserDetails = await userModel.findById(currentUser).exec();
    return user;
  }

  /**
   * Finds a user and their saved settings by their ID.
   * @param FindWithSettingsByIdParams - The ID of the user to find.
   * @returns A user object with settings included.
   */
  async findWithSettingsById({
    currentUser,
  }: UserTypes.FindWithSettingsByIdParams): Promise<UserTypes.UserDetailsWithSettings | null> {
    const user: UserTypes.UserDetailsWithSettings = await userModel.findById(currentUser).exec();
    return user;
  }

  /**
   * Finds a user by their email.
   * @param FindByEmailParams - The email to search for
   * @returns An array of user objects found, otherwise an empty array.
   */
  async findByEmail({ email }: UserTypes.FindByEmailParams): Promise<UserTypes.UserDetails[]> {
    const users: UserTypes.UserDetails[] = await userModel.find({ email: email }).exec();
    return users;
  }

  /**
   * Saves a new user to the database.
   * @param UserDetailsWithSettings - Details of the new user.
   * @returns The saved user object.
   */
  async saveNewUser({
    name,
    surname,
    email,
    password,
  }: UserTypes.RegisterParams): Promise<UserTypes.UserDetails> {
    const newUserObject = new userModel<UserTypes.UserDetailsWithSettings>({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      surname: surname,
      email: email,
      password: password,
      preferredFormat: "en-US",
      preferredCurrency: "USD",
      preferredCurrencyDisplay: "narrowSymbol",
    });

    const saveNewUser = await newUserObject.save();
    if (!saveNewUser) {
      logger.error(`An error occured while saving a new user with email ${email}`);
      throw new AppError({
        statusCode: statusCodes.internalServerError,
        messageKey: "statusMessages.internalError",
      });
    }
    return newUserObject;
  }

  /**
   * Updated a user from the database.
   * @param FindByIdAndUpdateUserParams - ID and details of the user to be updated.
   */
  async updateUser({
    currentUser,
    name,
    surname,
    email,
    preferredFormat,
    preferredCurrency,
    preferredCurrencyDisplay,
  }: UserTypes.FindByIdAndUpdateUserParams): Promise<void> {
    const updateUser = await userModel.findByIdAndUpdate(currentUser, {
      name: name,
      surname: surname,
      email: email,
      preferredFormat: preferredFormat,
      preferredCurrency: preferredCurrency,
      preferredCurrencyDisplay: preferredCurrencyDisplay,
    });
    if (!updateUser) {
      throw new AppError({
        statusCode: statusCodes.internalServerError,
        messageKey: "statusMessages.internalError",
      });
    }
    return;
  }

  /**
   * Deletes a user from the database.
   * @param currentUser - The ID of the user to delete.
   */
  async deleteUser({ currentUser }: UserTypes.FindByIdAndDeleteUserParams): Promise<void> {
    const deleteUser = await userModel.findByIdAndDelete(currentUser).exec();
    if (!deleteUser) {
      throw new AppError({
        statusCode: statusCodes.internalServerError,
        messageKey: "statusMessages.internalError",
      });
    }
    return;
  }
}

export default UserRepository;
