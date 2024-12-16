import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

import ResponseHelper from "@/helpers/responseHelper";

import logger from "@/utils/logger";
import TranslationHelper from "@/utils/translationHelper";

import statusCodes from "@/variables/statusCodes";

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
