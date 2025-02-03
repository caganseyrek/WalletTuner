interface ResponseHelperProps {
  isSuccess: boolean;
  responseMessage: string;
  data: object | null;
}

class ResponseHelper {
  static response({ isSuccess, responseMessage, data }: ResponseHelperProps): ResponseHelperProps {
    return {
      isSuccess: isSuccess,
      responseMessage: responseMessage,
      data: data,
    };
  }
}

export default ResponseHelper;
