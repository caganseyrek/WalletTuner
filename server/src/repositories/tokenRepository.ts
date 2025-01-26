import mongoose from "mongoose";

import tokenModel from "@/models/tokenModel";

import STATUS_CODES from "@/utils/constants/statusCodes";
import AppError from "@/utils/helpers/errorHelper";
import logger from "@/utils/logger";
import Sanitizer from "@/utils/sanitizer";

import TokenTypes from "@/types/token";

class TokenRepository {
  public async findTokensByUserId({
    belongsTo,
  }: TokenTypes.Repository.FindTokenByUserIdParams): Promise<TokenTypes.TokenObject[]> {
    const sanitizedQuery = Sanitizer.sanitizeQuery({ belongsTo: belongsTo });
    const tokens: TokenTypes.TokenObject[] = await tokenModel.find(sanitizedQuery).exec();
    return tokens;
  }

  public async findTokenByFilters({
    belongsTo,
    refreshToken,
  }: TokenTypes.Repository.FindTokenByFiltersParams): Promise<TokenTypes.TokenObject[]> {
    const sanitizedQuery = Sanitizer.sanitizeQuery({ refreshToken: refreshToken, belongsTo: belongsTo });
    const tokens: TokenTypes.TokenObject[] = await tokenModel.find(sanitizedQuery).exec();
    return tokens;
  }

  public async saveNewToken({
    userId,
    refreshToken,
  }: TokenTypes.Repository.SaveNewTokenParams): Promise<TokenTypes.TokenObject> {
    const sanitizedNewTokenObject = Sanitizer.sanitizeObject<TokenTypes.TokenObject>({
      _id: new mongoose.Types.ObjectId(),
      belongsTo: userId,
      refreshToken: refreshToken,
    });
    const newTokenObject = new tokenModel<TokenTypes.TokenObject>(sanitizedNewTokenObject);
    const saveNewToken = await newTokenObject.save();
    if (!saveNewToken) {
      logger.error(`An error occured while saving a new token belongs to user ID ${userId}`);
      throw new AppError({
        statusCode: STATUS_CODES.internalServerError.code,
        message: STATUS_CODES.internalServerError.message,
      });
    }
    return newTokenObject;
  }

  public async deleteToken({ userId }: TokenTypes.Repository.DeleteTokenParams): Promise<void> {
    const sanitizedQuery = Sanitizer.sanitizeObject<object>({ belongsTo: userId });
    const deleteTokens = await tokenModel.findOneAndDelete(sanitizedQuery).exec();
    if (!deleteTokens) {
      logger.error(`An error occured while deleting a new token belongs to user ID ${userId}`);
      throw new AppError({
        statusCode: STATUS_CODES.internalServerError.code,
        message: STATUS_CODES.internalServerError.message,
      });
    }
    return;
  }
}

export default TokenRepository;
