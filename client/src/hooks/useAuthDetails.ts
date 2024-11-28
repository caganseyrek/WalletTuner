import GlobalTypes from "@/types/globals";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useAuthDetails = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["authDetails"],
    queryFn: () => queryClient.getQueryData<GlobalTypes.AuthDetailsParams>(["authDetails"]),
    initialData: {
      accessToken: undefined,
      currentUser: undefined,
      currentEmail: undefined,
      name: undefined,
    },
    enabled: false,
  });
};

export default useAuthDetails;
