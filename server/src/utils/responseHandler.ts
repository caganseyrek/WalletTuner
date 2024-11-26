import { ResponseParameters } from "@/types/utils";

function generateResponse({ isSuccess, message, data }: ResponseParameters) {
  return {
    isSuccess: isSuccess,
    message: message,
    data: data,
  };
}

export default generateResponse;
