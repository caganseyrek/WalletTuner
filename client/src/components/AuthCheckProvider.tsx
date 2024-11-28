import { useNavigate } from "react-router-dom";

import ComponentTypes from "@/types/components";

import useAuthDetails from "@/hooks/useAuthDetails";
import useOnMountEffect from "@/hooks/useOnMountEffect";

const AuthCheckProvider = ({ children }: ComponentTypes.AuthCheckProps) => {
  const navigate = useNavigate();
  const { data: authDetails } = useAuthDetails();

  useOnMountEffect(() => {
    if (!authDetails?.accessToken) {
      return navigate("/login");
    } else {
      return navigate("/accounts");
    }
  });

  if (!authDetails) {
    return null;
  }

  return <>{children}</>;
};

export default AuthCheckProvider;
