import { BadRequestError } from "@/app/error/errors";

import logger from "@/utils/logger";

class Sanitizer {
  /**
   * Escapes potentially dangerous characters (`$` and `.`) in strings
   * to prevent NoSQL injection.
   *
   * @param {string} object - The string to sanitize.
   * @returns {string} - The sanitized string.
   */
  public static sanitize<TObject>(object: TObject): TObject {
    return this._sanitize(object, new WeakSet<object>()) as TObject;
  }

  /**
   * Recursively sanitizes a value by handling different data types.
   *
   * - Escapes dangerous characters in strings.
   * - Recursively sanitizes arrays and objects.
   * - Detects and prevents circular references.
   * - Throws an error for invalid types.
   *
   * @private
   * @param {unknown} value - The value to sanitize.
   * @param {WeakSet<object>} _visitedObjects - A set to track visited objects and detect circular references.
   * @returns {unknown} - The sanitized value.
   * @throws {BadRequestError} - Throws an error if an invalid type or circular reference is detected.
   */
  private static _sanitize(value: unknown, _visitedObjects: WeakSet<object>): unknown {
    if (typeof value === "string") {
      return value.replace(/[*+?^${}()|[\]]/g, "\\$&");
    } else if (Array.isArray(value)) {
      return value.map((e) => this._sanitize(e, _visitedObjects));
    } else if (value && typeof value === "object") {
      if (_visitedObjects.has(value)) {
        logger.warn("Circular reference detected during sanitation.");
        throw new BadRequestError();
      }
      _visitedObjects.add(value);
      return this._sanitizeObject(value as Record<string, unknown>, _visitedObjects);
    } else if (typeof value === "number" || typeof value === "boolean") {
      return value;
    } else if (value === null) {
      return null;
    } else if (value === undefined) {
      return undefined;
    }
    logger.error(`Encountered invalid type '${typeof value}'`);
    throw new BadRequestError();
  }

  /**
   * Recursively sanitizes an object by:
   * - Filtering out dangerous keys (e.g., `$`-prefixed keys and dotted keys).
   * - Sanitizing nested properties.
   * - Tracking circular references.
   *
   * @private
   * @param {Record<string, unknown>} object - The object to sanitize.
   * @param {WeakSet<object>} _visitedObjects - A set to track visited objects and detect circular references.
   * @returns {Record<string, unknown>} - The sanitized object.
   */
  private static _sanitizeObject(
    object: Record<string, unknown>,
    _visitedObjects: WeakSet<object>,
  ): Record<string, unknown> {
    const sanitizedObject: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(object)) {
      if (key.startsWith("$") || key.includes(".")) {
        logger.warn(`Filtered out potentially dangerous key: ${key}`);
        continue;
      }
      sanitizedObject[key] = this._sanitize(value, _visitedObjects);
    }
    return sanitizedObject;
  }
}

export default Sanitizer;
