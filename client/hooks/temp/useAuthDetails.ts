import { useQuery, useQueryClient } from "@tanstack/react-query";

import GlobalTypes from "@/types/globals";

const useAuthDetails = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["authDetails"],
    queryFn: () => queryClient.getQueryData<GlobalTypes.AuthDetailsParams>(["authDetails"]),
    initialData: {
      email: undefined,
      name: undefined,
    },
    enabled: false,
  });
};

export default useAuthDetails;
