import { describe, expect, it } from "@jest/globals";

import PasswordHelper from "@/helpers/passwordHelper";

describe("PasswordHelper Utility", () => {
  it("should hash a password", async () => {
    const password: string = "examplePassword123";
    const hashedPassword: string = await PasswordHelper.hash({ password: password });

    expect(hashedPassword).not.toBe(password);
    expect(hashedPassword).toBeDefined();
  });

  it("should successfully compare a normal and hashed password", async () => {
    const password: string = "examplePassword123";
    const hashedPassword: string = await PasswordHelper.hash({ password: password });
    const comparisonResult: boolean = await PasswordHelper.compare({
      enteredPassword: password,
      hashedPassword: hashedPassword,
    });

    expect(comparisonResult).toBe(true);
    expect(comparisonResult).toBeDefined();
  });
});
