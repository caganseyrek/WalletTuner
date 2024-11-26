import { NextFunction, Request, Response } from "express";
import { t } from "i18next";
import { ZodSchema } from "zod";

import generateResponse from "@/utils/responseHandler";
import statusCodes from "@/utils/statusCodes";

function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validate = schema.safeParse(req.body);

    if (!validate.success) {
      return res.status(statusCodes.badRequest).json(
        generateResponse({
          isSuccess: false,
          message: t("statusMessages.badRequest"),
          data: null,
        }),
      );
    }
    next();
  };
}
export default validate;
