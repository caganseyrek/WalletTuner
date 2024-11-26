import { Identifier } from "./global";

namespace TokenTypes {
  export interface TokenDetails {
    _id: mongoose.Types.ObjectId;
    refreshToken: string;
    belongsTo: mongoose.Types.ObjectId;
  }

  export type FindByFiltersParams = Omit<TokenDetails, "_id">;
  export type FindByUserIdParams = Omit<TokenDetails, "_id", "refreshToken">;
  export type clearExistingTokensParams = Identifier;

  export type NewTokenParams = Identifier & { refreshToken: string };
}

export default TokenTypes;
