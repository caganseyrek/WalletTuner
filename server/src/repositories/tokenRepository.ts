import mongoose from "mongoose";

import tokenModel from "@/models/tokenModel";

import AppError from "@/utils/errorHandler";
import logger from "@/utils/logger";
import statusCodes from "@/utils/statusCodes";

import TokenTypes from "@/types/token";

class TokenRepository {
  /**
   * Finds all refresh tokens that belongs to specified user.
   * @param FindByFiltersParams - Refresh token and the user ID that token belongs to.
   * @returns Details of the saved token object that belongs to given user ID.
   */
  async findByFilters({ refreshToken, belongsTo }: TokenTypes.FindByFiltersParams): Promise<TokenTypes.TokenDetails[]> {
    const tokens: TokenTypes.TokenDetails[] = await tokenModel
      .find({
        refreshToken: refreshToken,
        belongsTo: belongsTo,
      })
      .exec();
    return tokens;
  }

  /**
   * Saves a refresh token to the database.
   * @param NewTokenProps - Refresh token and the user ID that token belongs to.
   * @returns Details of the new token object saved.
   * @throws AppError if token cannot be saved to the database.
   */
  async saveNewToken({ currentUser, refreshToken }: TokenTypes.NewTokenParams): Promise<TokenTypes.TokenDetails> {
    const newTokenObject = new tokenModel<TokenTypes.TokenDetails>({
      _id: new mongoose.Types.ObjectId(),
      belongsTo: currentUser,
      refreshToken: refreshToken,
    });

    const saveNewToken = await newTokenObject.save();
    if (!saveNewToken) {
      logger.error(`An error occured while saving a new token belongs to user ID ${currentUser}`);
      throw new AppError({
        statusCode: statusCodes.internalServerError,
        messageKey: "statusMessages.internalError",
      });
    }

    return newTokenObject;
  }

  async clearExistingTokens({ currentUser }: TokenTypes.clearExistingTokensParams): Promise<void> {
    const existingRefreshTokens: TokenTypes.TokenDetails[] = await tokenModel.find({ belongsTo: currentUser }).exec();
    if (existingRefreshTokens.length >= 1) {
      existingRefreshTokens.forEach(async (token) => {
        try {
          await tokenModel.findByIdAndDelete(token._id).exec();
        } catch {
          throw new AppError({
            statusCode: statusCodes.internalServerError,
            messageKey: "statusMessages.internalError",
          });
        }
      });
    }
    return;
  }
}

export default TokenRepository;
