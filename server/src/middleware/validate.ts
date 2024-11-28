import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

import logger from "@/utils/logger";
import ResponseHelper from "@/utils/responseHelper";
import statusCodes from "@/utils/statusCodes";
import TranslationHelper from "@/utils/translationHelper";

function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validate = schema.safeParse(req.body);

    if (!validate.success) {
      logger.error(`Cannot validate request params from request to ${req.url}: ${validate.error.message}`);
      return res.status(statusCodes.badRequest).json(
        ResponseHelper.generateResponse({
          isSuccess: false,
          message: TranslationHelper.translate(req, "statusMessages.badRequest"),
          data: null,
        }),
      );
    }
    next();
  };
}
export default validate;
