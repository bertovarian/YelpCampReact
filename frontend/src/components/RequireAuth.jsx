import { useEffect } from "react";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
const RequireAuth = () => {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  let location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: location } })
    }
  }, [])

  return (
    <Outlet />
  );
}

export default RequireAuth
