import { useNavigate } from "react-router-dom";

import useAuthDetails from "@/hooks/useAuthDetails";
import useOnMountEffect from "@/hooks/useOnMountEffect";

const AuthCheckProvider = ({ isPagePublic, children }: AuthCheckProps) => {
  const navigate = useNavigate();
  const { data } = useAuthDetails();

  return (
    <>
      {useOnMountEffect(() => {
        if (data?.accessToken && isPagePublic) {
          return navigate("/");
        } else if (!data?.accessToken && !isPagePublic) {
          return navigate("/login");
        }
      })}
      {children}
    </>
  );
};

export default AuthCheckProvider;
