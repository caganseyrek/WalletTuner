import { Token } from "@wallettuner/resource-types";
import mongoose from "mongoose";

import { InternalError } from "@/app/error/errors";

import authModel from "@/resources/auth/token/token.model";

import logger from "@/utils/logger";

class TokenRepository {
  public async findByUserId(params: Token.FindByUserIdProps): Promise<Token.RefreshTokenProps[]> {
    const tokens: Token.RefreshTokenProps[] = await authModel.find({ user_id: params.user_id }).exec();
    return tokens;
  }

  public async findByToken(params: Token.FindByTokenProps): Promise<Token.RefreshTokenProps | null> {
    const tokens: Token.RefreshTokenProps | null = await authModel.findOne({ token: params.token }).exec();
    return tokens;
  }

  public async saveRefreshToken(params: Token.CreateProps): Promise<void> {
    const newTokenObject = new authModel<Token.RefreshTokenProps>({
      _id: new mongoose.Types.ObjectId(),
      user_id: params.user_id,
      token: params.token,
    });
    const saveNewToken = await newTokenObject.save();
    if (!saveNewToken) {
      logger.error(`An error occured while saving a new auth that belongs to user id ${params.user_id}`);
      throw new InternalError();
    }
  }

  public async deleteRefreshToken(params: Token.DeleteProps): Promise<void> {
    const deleteToken = await authModel.findOneAndDelete({ user_id: params.user_id }).exec();
    if (!deleteToken) {
      logger.error(`An error occured while deleting a refresh token with belongs to user id ${params.user_id}`);
      throw new InternalError();
    }
  }
}

export default TokenRepository;
