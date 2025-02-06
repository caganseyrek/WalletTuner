import mongoose from "mongoose";

import { InternalError } from "@/app/errors/errors";

import authModel from "@/resources/auth/token/token.model";

import logger from "@/utils/logger";
import Sanitizer from "@/utils/sanitizer";

import { Token } from "./token.types";

class TokenRepository {
  public async findByUserId(params: Token.FindByUserIdProps): Promise<Token.RefreshTokenProps[]> {
    const sanitizedQuery = Sanitizer.sanitizeQuery<Token.FindByUserIdProps>({ user_id: params.user_id });
    const tokens: Token.RefreshTokenProps[] = await authModel.find(sanitizedQuery).exec();
    return tokens;
  }

  public async findByToken(params: Token.FindByTokenProps): Promise<Token.RefreshTokenProps | null> {
    const sanitizedQuery = Sanitizer.sanitizeQuery<Token.FindByTokenProps>({ token: params.token });
    const tokens: Token.RefreshTokenProps | null = await authModel.findOne(sanitizedQuery).exec();
    return tokens;
  }

  public async saveRefreshToken(params: Token.CreateProps): Promise<void> {
    const sanitizedNewTokenObject = Sanitizer.sanitize<Token.RefreshTokenProps>({
      _id: new mongoose.Types.ObjectId(),
      user_id: params.user_id,
      token: params.token,
    });
    const newTokenObject = new authModel<Token.RefreshTokenProps>(sanitizedNewTokenObject);
    const saveNewToken = await newTokenObject.save();
    if (!saveNewToken) {
      logger.error(`An error occured while saving a new auth that belongs to user id ${params.user_id}`);
      throw new InternalError();
    }
  }

  public async deleteRefreshToken(params: Token.DeleteProps): Promise<void> {
    const sanitizedQuery = Sanitizer.sanitizeQuery<Token.DeleteProps>({ user_id: params.user_id });
    const deleteToken = await authModel.findOneAndDelete(sanitizedQuery).exec();
    if (!deleteToken) {
      logger.error(`An error occured while deleting a refresh token with belongs to user id ${params.user_id}`);
      throw new InternalError();
    }
  }
}

export default TokenRepository;
