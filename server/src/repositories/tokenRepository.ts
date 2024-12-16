import mongoose from "mongoose";

import tokenModel from "@/models/tokenModel";

import AppError from "@/utils/errorHandler";
import logger from "@/utils/logger";
import Sanitizer from "@/utils/sanitizer";
import statusCodes from "@/utils/statusCodes";

import TokenTypes from "@/types/token";

class TokenRepository {
  /**
   * Finds all refresh tokens that belongs to specified user.
   * @param FindByFiltersParams - Refresh token and the user ID that token belongs to.
   * @returns Details of the saved token object that belongs to given user ID.
   */
  async findByFilters({ refreshToken, belongsTo }: TokenTypes.FindByFiltersParams): Promise<TokenTypes.TokenDetails[]> {
    const sanitizedQuery = Sanitizer.sanitizeQuery({ refreshToken: refreshToken, belongsTo: belongsTo });
    const tokens: TokenTypes.TokenDetails[] = await tokenModel.find(sanitizedQuery).exec();
    return tokens;
  }

  /**
   * Saves a refresh token to the database.
   * @param NewTokenProps - Refresh token and the user ID that token belongs to.
   * @returns Details of the new token object saved.
   * @throws AppError if token cannot be saved to the database.
   */
  async saveNewToken({ currentUser, refreshToken }: TokenTypes.NewTokenParams): Promise<TokenTypes.TokenDetails> {
    const sanitizedNewTokenObject = Sanitizer.sanitizeObject<TokenTypes.TokenDetails>({
      _id: new mongoose.Types.ObjectId(),
      belongsTo: currentUser,
      refreshToken: refreshToken,
    });
    const newTokenObject = new tokenModel<TokenTypes.TokenDetails>(sanitizedNewTokenObject);
    const saveNewToken = await newTokenObject.save();
    if (!saveNewToken) {
      logger.error(`An error occured while saving a new token belongs to user ID ${currentUser}`);
      throw new AppError({
        statusCode: statusCodes.internalServerError,
        message: "statusMessages.internalError",
      });
    }
    return newTokenObject;
  }

  async clearExistingTokens({ currentUser }: TokenTypes.clearExistingTokensParams): Promise<void> {
    const sanitizedQuery = Sanitizer.sanitizeQuery({ belongsTo: currentUser });
    const existingRefreshTokens: TokenTypes.TokenDetails[] = await tokenModel.find(sanitizedQuery).exec();
    if (existingRefreshTokens.length >= 1) {
      existingRefreshTokens.forEach(async (token) => {
        try {
          const sanitizedQuery = Sanitizer.sanitizeValue(token._id);
          await tokenModel.findByIdAndDelete(sanitizedQuery).exec();
        } catch {
          throw new AppError({
            statusCode: statusCodes.internalServerError,
            message: "statusMessages.internalError",
          });
        }
      });
    }
    return;
  }
}

export default TokenRepository;
