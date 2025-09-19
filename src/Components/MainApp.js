import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, Suspense } from "react";
import * as actions from "../stores/actions";
import { routes } from "./RoutesConfig";
import { Box ,Toolbar } from "@mui/material";
import SideNavbar from "./HomePage/SideNavbar";
import Footer from "../Components/HomePage/Footer";
import Login from "../Components/UserLogin/LoginPage";
import PasswordReset from "../Components/UserLogin/PasswordReset";
import RegisterPage from "../Components/UserLogin/RegisterUser";
import GlobalLoader from "../Config/GlobalLoader";
import LinearProgress from '@mui/material/LinearProgress';
import SuccessFailureSnackbar from "../Config/SuccessFailureSnackbar";
import ProtectedRoute from "../Config/ProtectedRoute";
import PublicRoute from "../Config/PublicRoute";
import TopNavbar from "./HomePage/TopNavbar";



// Layout with Navbar + Footer
function AppLayout() {
  const collapsed =useSelector((state)=>state.login.collapsed)
   const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  // Watch for resize → update mobile/desktop mode

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 console.log('sidenavbar__',collapsed)
  
  return (
   <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Top AppBar */}
      <TopNavbar
       isMobile={isMobile}
       setIsMobile={setIsMobile}
      />
      {/* Push content below appbar */}
      <Toolbar  
     
      />

      {/* Body: Sidebar + Main */}
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <SideNavbar
          isMobile={isMobile}
        />

        {/* Main Content */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Suspense fallback={<LinearProgress sx={{mt:1.5}}/>}>
            <GlobalLoader />
            <SuccessFailureSnackbar />

            <main style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
              <Outlet />
            </main>
            <Footer />
          </Suspense>
        </Box>
      </Box>
    </Box>
    </>
  );
}

// Layout without Navbar + Footer (for login)
function PublicLayout() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <SuccessFailureSnackbar/>
      <GlobalLoader />
      <Outlet />
    </div>
  );
}

export default function MainApp() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const arrayList = useSelector((state) => state.user.dataList);
  const value =  JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    dispatch(actions.fetchUser());
  }, [dispatch]);

  console.log('value JSON___',value);

  console.log("dummy json___", arrayList);
  console.log('isAuthenticate___',isAuthenticated)

  return (
 
    <Router>
      <Routes>
        {/* Public layout (no navbar/footer) */}
        <Route element={<PublicRoute />}>
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/password_reset" element={<PasswordReset />} />
            <Route path="/register-user" element={<RegisterPage />} />
          </Route>
        </Route>

        {/* Protected layout (with navbar/footer) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            {/* Default landing → Home */}
            <Route index element={<Navigate to="/home" replace />} />

            {routes
              .filter(
                (r) =>
                  r.path !== "/login" &&
                  r.path !== "/password_reset" &&
                  r.path !== "/register-user"
              )
              .map(({ path, element, index, ...rest }) => (
                <Route
                  key={path || "index"}
                  path={path}
                  index={index}
                  element={element}
                  {...rest}
                />
              ))}
          </Route>
        </Route>

        {/* Fallback → conditional based on auth */}
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>

  );
}
