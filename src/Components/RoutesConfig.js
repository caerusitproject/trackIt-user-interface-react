import { lazy } from 'react';

const LoginPage = lazy(() => import('./UserLogin/LoginPage'));
const Request = lazy(() => import('../Components/Requests/RequestPage'));
const Solution = lazy(() => import('./Solution'));
const ForgetPassword = lazy(() => import('./UserLogin/ForgetPassword'));
const ResetPassword = lazy(() => import('./UserLogin/PasswordReset'));
const NotFound = lazy(() => import('./Notfound'));
const RegisterPage = lazy(() => import('./UserLogin/RegisterUser'));
const Home = lazy(() => import('./HomePage/HomePage'));
const EditForm = lazy(() => import('./Requests/CreateEditRequestTicket'));
const TicketDetails = lazy(() => import('../Components/Requests/TicketDetails/TicketBody'));
const AccountDetails = lazy(() => import('../Components/HomePage/AccountDetails'));
const FormBuilder = lazy(() => import('../Components/HomePage/FormBuilder'))
const AssetsViewer = lazy(() => import('../Components/Assets/AssetsNavigation'))
const AssetMenuBuilder = lazy(() => import('../Components/Assets/AssetMenuBuilder'))
const SolutionMain = lazy(() => import('../Components/Solutions/SolutionMain'))



export const routes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register-user", element: <RegisterPage /> },
  { path: "/request", element: <Request />, roles: ["user"] },
  { path: "/account-details", element: <AccountDetails />, roles: ["user"] },
  { path: "/solution", element: <SolutionMain />, roles: ["user"] },
  { path: "/milestone-builder", element: <FormBuilder />, roles: ["user"] },
  { path: "/assets", element: <AssetsViewer />, roles: ["user", "admin"] },
  { path: "/asset-menu-builder", element: <AssetMenuBuilder />, roles: ["user"] },
  { path: "/request/ticket/:ticketId", element: <TicketDetails />, roles: ["user", "admin"] },
  { path: "/forget_password", element: <ForgetPassword /> },
  { path: "/reset_password", element: <ResetPassword /> },
  { path: "/home", element: <Home />, roles: ["user", "admin"] },
  { path: "*", element: <NotFound /> },
];
