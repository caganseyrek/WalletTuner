import { compare, genSalt, hash } from "bcrypt";

class PasswordHelper {
  static async hash(password: string): Promise<string> {
    const salt: string = await genSalt(10);
    return await hash(password, salt);
  }

  static async compare(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}

export default PasswordHelper;
