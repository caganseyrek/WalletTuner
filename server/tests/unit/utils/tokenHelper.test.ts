import { describe, expect, it } from "@jest/globals";

import TokenHelper from "@/utils/tokenHelper";

describe("TokenHelper Utility", () => {
  it("should sign a token with given payload and verify the token", () => {
    const tokenPayload: string = "1234567890_test";
    const token: string = TokenHelper.generate({ payload: tokenPayload, tokenType: "access" });
    const verify: string = TokenHelper.verify({ tokenValue: token, tokenType: "access" }) as string;

    expect(token).toBeDefined();
    expect(verify).toMatchObject({ data: tokenPayload });
  });

  it("should return an empty string if a token cannot be verified", () => {
    const verify: string = TokenHelper.verify({ tokenValue: "invalid value", tokenType: "access" }) as string;

    expect(verify).toBe("");
  });
});
