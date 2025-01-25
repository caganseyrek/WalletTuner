import { Document, FilterQuery } from "mongoose";

import AppError from "./helpers/errorHelper";

import STATUS_CODES from "./constants/statusCodes";
import logger from "./logger";

class Sanitizer {
  private static _visitedObjects = new WeakSet<object>();

  public static sanitizeQuery<TData extends Document>(query: FilterQuery<TData>): FilterQuery<TData> {
    return this._sanitizeVal(query) as FilterQuery<TData>;
  }

  public static sanitizeValue(value: string): string {
    return this._sanitizeVal(value) as string;
  }

  public static sanitizeObject<TObject>(object: Record<string, unknown>): TObject {
    return this._sanitizeObj<TObject>(object);
  }

  private static _sanitizeVal(value: unknown): unknown {
    if (typeof value === "string") {
      return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    } else if (Array.isArray(value)) {
      return value.map((e) => this._sanitizeVal(e));
    } else if (value && typeof value === "object") {
      if (this._visitedObjects.has(value)) {
        logger.error("Circular reference detected during sanitation.");
        throw new AppError({
          statusCode: STATUS_CODES.badRequest.code,
          message: "Couldn't validate request params.",
        });
      }
      this._visitedObjects.add(value);
      return this._sanitizeObj(value as Record<string, unknown>);
    } else if (typeof value === "number" || typeof value === "boolean") {
      return value;
    } else if (value === null) {
      return null;
    }
    logger.error(`Encountered invalid type '${typeof value}' with content: ${JSON.stringify(value)}`);
    throw new AppError({
      statusCode: STATUS_CODES.badRequest.code,
      message: "Couldn't validate request params.",
    });
  }

  private static _sanitizeObj<TObject>(obj: Record<string, unknown>): TObject {
    const sanitizedObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (key.startsWith("$")) {
        continue;
      }
      sanitizedObj[key] = this._sanitizeVal(value);
    }
    return sanitizedObj as TObject;
  }
}

export default Sanitizer;
