import { compare, genSalt, hash } from "bcrypt";

import { PasswordHelperTypes } from "@/types/utils";

class PasswordHelper {
  static async hash({ password }: PasswordHelperTypes.HashParams) {
    const salt: string = await genSalt(10);
    return await hash(password, salt);
  }

  static async compare({ enteredPassword, hashedPassword }: PasswordHelperTypes.CompareParams) {
    return await compare(enteredPassword, hashedPassword);
  }
}

export default PasswordHelper;
