import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

import STATUS_CODES from "@/utils/constants/statusCodes";
import ResponseHelper from "@/utils/helpers/responseHelper";
import logger from "@/utils/logger";

function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validate = schema.safeParse(req.body);

    if (!validate.success) {
      logger.error(`Cannot validate request params from request to ${req.url}: ${validate.error.message}`);
      return res.status(STATUS_CODES.badRequest.code).json(
        ResponseHelper.generate({
          isSuccess: false,
          message: STATUS_CODES.badRequest.message,
          data: null,
        }),
      );
    }
    next();
  };
}
export default validate;
