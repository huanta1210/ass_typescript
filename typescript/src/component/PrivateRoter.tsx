import { Navigate, Outlet } from "react-router";

const PrivateRoter = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
export default PrivateRoter;
