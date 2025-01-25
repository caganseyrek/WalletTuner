import { useQuery } from "@tanstack/react-query";
import { EasyRequester } from "easy-requester";

const useValidateAuth = () => {
  const validate = useQuery({
    queryKey: ["validateAuthQuery"],
    queryFn: async () => {
      const response = await new EasyRequester()
        .setConfig({
          method: "GET",
          endpoint: { route: "user", action: "validate" },
        })
        .sendRequest();
      return response;
    },
  });
  return validate;
};

export default useValidateAuth;
