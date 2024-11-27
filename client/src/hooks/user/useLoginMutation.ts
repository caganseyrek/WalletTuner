import { useMutation, useQueryClient } from "@tanstack/react-query";

import { controllers, methods, Requester, routes } from "@/utils/requester";

const useLoginMutation = () => {
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationKey: ["loginMutation"],
    mutationFn: async (loginData: LoginRequestProps) => {
      const response = await new Requester({
        method: methods.post,
        endpoint: {
          route: routes.user,
          controller: controllers.login,
        },
        payload: loginData,
      }).send<LoginResponseProps>();

      return response;
    },
    onSuccess: (loginData: BackendResponseProps<LoginResponseProps>) => {
      const authDetails: AuthDetailsProps = {
        accessToken: loginData.data?.accessToken,
        currentUser: loginData.data?.currentUser,
        currentEmail: loginData.data?.currentEmail,
        name: loginData.data?.name,
      };
      queryClient.setQueryData<AuthDetailsProps>(["authDetails"], authDetails);
    },
  });

  return login;
};

export default useLoginMutation;
