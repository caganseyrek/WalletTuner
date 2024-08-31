import { useNavigate } from "react-router-dom";

import useAuthDetails from "@/hooks/useAuthDetails";
import useOnMountEffect from "@/hooks/useOnMountEffect";

const AuthCheckProvider = ({ children }: AuthCheckProps) => {
  const navigate = useNavigate();
  const { data: authDetails } = useAuthDetails();

  useOnMountEffect(() => {
    if (!authDetails?.accessToken) {
      return navigate("/login");
    }
  });

  if (!authDetails!.accessToken) {
    return null;
  }

  return <>{children}</>;
};

export default AuthCheckProvider;
