import { Request } from "express";

import logger from "./logger";

class TranslationHelper {
  static translate(req: Request, key: string): string {
    const doesKeyExists: boolean = req.i18n.exists(key);
    if (!doesKeyExists) {
      logger.error(`Translation key ${key} not found.`);
      return key;
    }
    return req.t(key);
  }
}

export default TranslationHelper;
