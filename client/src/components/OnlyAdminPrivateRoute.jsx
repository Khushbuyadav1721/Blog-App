import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const OnlyAdminPrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) return <Navigate to="/sign-in" />;
  if (!currentUser.isAdmin) return <Navigate to="/dashboard" />;

  return <Outlet />;
};
