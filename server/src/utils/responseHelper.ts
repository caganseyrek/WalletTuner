import { ResponseParameters } from "@/types/utils";

class ResponseHelper {
  static generateResponse({ isSuccess, message, data }: ResponseParameters) {
    return {
      isSuccess: isSuccess,
      message: message,
      data: data,
    };
  }
}
export default ResponseHelper;
