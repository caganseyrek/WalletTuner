import { useNavigate } from "react-router-dom";

import useAuthDetails from "@/hooks/useAuthDetails";
import useOnMountEffect from "@/hooks/useOnMountEffect";

const AuthCheckProvider = ({ children }: AuthCheckProps) => {
  const navigate = useNavigate();
  const { data: authDetails } = useAuthDetails();

  useOnMountEffect(() => {
    if (!authDetails?.accessToken) {
      return navigate("/401");
    } else {
      return navigate("/accounts");
    }
  });

  if (!authDetails!.accessToken) {
    return null;
  }

  return <>{children}</>;
};

export default AuthCheckProvider;
