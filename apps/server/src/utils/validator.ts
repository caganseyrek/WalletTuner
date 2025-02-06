import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

import { BadRequestError } from "@/app/errors/errors";

class Validator {
  public static validateRequestBody<T>(schema: ZodSchema<T>) {
    return (req: Request, _res: Response, next: NextFunction) => {
      const parsedRequestBody = schema.safeParse(req.body);
      if (!parsedRequestBody.success || parsedRequestBody.error) {
        throw new BadRequestError();
      } else next();
    };
  }
}

export default Validator;
