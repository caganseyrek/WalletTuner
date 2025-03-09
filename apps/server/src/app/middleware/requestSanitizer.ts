import { NextFunction, Request, Response } from "express";

import Sanitizer from "@/utils/sanitizer";

const requestSanitizer = (req: Request, _res: Response, next: NextFunction): void => {
  Sanitizer.sanitize(req.query);
  Sanitizer.sanitize(req.params);
  Sanitizer.sanitize(req.body);
  Sanitizer.sanitize(req.headers);
  Sanitizer.sanitize(req.cookies);
  Sanitizer.sanitize(req.signedCookies);
  next();
};

export default requestSanitizer;
