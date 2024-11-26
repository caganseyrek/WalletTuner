import { NextFunction, Request, Response } from "express";

import logger from "@/utils/logger";

function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const requestStart: number = Date.now();
  logger.info(`Incoming request: ${req.method} ${req.url}`);

  res.on("finish", () => {
    const requestDuration: number = Date.now() - requestStart;
    logger.info(`Outgoing response: ${req.method} ${req.url} - ${requestDuration}ms`);
  });
  next();
}

export default loggerMiddleware;
