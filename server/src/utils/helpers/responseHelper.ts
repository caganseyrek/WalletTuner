import { GlobalTypes } from "@/types/globals";

class ResponseHelper {
  static generate({ isSuccess, message, data }: GlobalTypes.ResponseParameters) {
    return {
      isSuccess: isSuccess,
      message: message,
      data: data,
    };
  }
}

export default ResponseHelper;
