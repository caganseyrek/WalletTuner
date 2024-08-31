import { useNavigate } from "react-router-dom";

import useAuthDetails from "@/hooks/useAuthDetails";
import useOnMountEffect from "@/hooks/useOnMountEffect";

const AuthCheckProvider = ({ isPagePublic, children }: AuthCheckProps) => {
  const navigate = useNavigate();
  const { data: authDetails } = useAuthDetails();

  useOnMountEffect(() => {
    if (authDetails?.accessToken && isPagePublic) {
      return navigate("/");
    } else if (!authDetails?.accessToken && !isPagePublic) {
      return navigate("/login");
    }
  });

  if ((authDetails!.accessToken && isPagePublic) || (!authDetails!.accessToken && !isPagePublic)) {
    return null;
  }

  return <>{children}</>;
};

export default AuthCheckProvider;
