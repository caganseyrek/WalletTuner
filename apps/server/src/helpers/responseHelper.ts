interface ResponseProps {
  isSuccess: boolean;
  responseMessage: string;
  data: object | null;
}

class ResponseHelper {
  /**
   * Generates a standardized response object.
   *
   * @param {ResponseProps} params - The response parameters.
   * @param {boolean} params.isSuccess - Indicates if the operation was successful.
   * @param {string} params.responseMessage - Message describing the response.
   * @param {object | null} params.data - The data payload, if any.
   * @returns {ResponseProps} A standardized response object.
   */
  static createResponse({ isSuccess, responseMessage, data }: ResponseProps): ResponseProps {
    return {
      isSuccess: isSuccess,
      responseMessage: responseMessage,
      data: data,
    };
  }
}

export default ResponseHelper;
