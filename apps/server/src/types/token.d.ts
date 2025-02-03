import { Response } from "express";
import mongoose from "mongoose";

import { GlobalTypes } from "./globals";

namespace TokenTypes {
  export interface TokenObject {
    _id: mongoose.Types.ObjectId;
    refreshToken: string;
    belongsTo: mongoose.Types.ObjectId;
  }
  export type AccessTokenParams = Record<string, string>;
  export type NewTokenParams = { refreshToken: string } & GlobalTypes.ServerResponse & GlobalTypes.Identifiers;
  export type ClearExistingTokensParams = GlobalTypes.Identifiers;
  export namespace Repository {
    export type FindTokenByFiltersParams = Omit<TokenObject, "_id">;
    export type FindTokenByUserIdParams = { belongsTo: string | mongoose.Types.ObjectId };
    export type SaveNewTokenParams = GlobalTypes.Identifiers & Pick<TokenObject, "refreshToken">;
    export type DeleteTokenParams = GlobalTypes.Identifiers;
  }
}

export default TokenTypes;
