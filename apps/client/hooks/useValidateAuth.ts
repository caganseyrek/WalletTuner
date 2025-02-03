import { useQuery } from "@tanstack/react-query";

import { EasyRequester } from "@/lib/EasyRequester/src";

const useValidateAuth = () => {
  const validate = useQuery({
    queryKey: ["validateAuthQuery"],
    queryFn: async () => {
      const response = await new EasyRequester()
        .setConfig({
          requestConfig: {
            method: "GET",
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
            endpoint: { route: "user", action: "auth/validate" },
            includeCookies: true,
          },
        })
        .sendRequest();
      return response;
    },
  });
  return validate;
};

export default useValidateAuth;
