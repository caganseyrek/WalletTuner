import { compare, genSalt, hash } from "bcrypt";

import { UtilsTypes } from "@/types/utils";

class PasswordHelper {
  static async hash({ password }: UtilsTypes.PasswordHelper.HashParams) {
    const salt: string = await genSalt(10);
    return await hash(password, salt);
  }

  static async compare({ enteredPassword, hashedPassword }: UtilsTypes.PasswordHelper.CompareParams) {
    return await compare(enteredPassword, hashedPassword);
  }
}

export default PasswordHelper;
