import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../helpers";

function ProtectedRoute() {
  const token = getToken();

  return token
    ? <Outlet />
    : <Navigate to="/" replace />;
}

export default ProtectedRoute;