import { Request } from "express";

import logger from "./logger";

class TranslationHelper {
  static translate(_req: Request, key: string): string {
    const doesKeyExists: boolean = false;
    if (!doesKeyExists) {
      logger.error(`Translation key ${key} not found.`);
      return key;
    }
    return key;
  }
}

export default TranslationHelper;
