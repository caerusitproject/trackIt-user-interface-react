// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({ redirectPath = "/login" }) => {
//   // Assuming your login reducer keeps something like: { isAuthenticated: true, user: {...} }
//   const isAuthenticated = useSelector((state) => state.login.isAuthenticated);

//  console.log('authenticate__',isAuthenticated)
// //   if (!isAuthenticated) {
// //     return <Navigate to={redirectPath} replace />;
// //   }

//   return isAuthenticated ?  <Outlet /> : <Navigate to={redirectPath} replace />;
// };

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ roles = [], element }) => {
  const user = JSON.parse(localStorage.getItem("user")); // or from context/provider
  const isAuthenticated = !!user;
  const userRole = 'user'; // e.g. "admin" | "user"

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(userRole)) {
    return <Navigate to="/home" replace />; // or a 403 page
  }

  return element;
};

export default ProtectedRoute;

