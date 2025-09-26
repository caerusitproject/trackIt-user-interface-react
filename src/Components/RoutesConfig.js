import { lazy } from 'react';

const LoginPage = lazy(() => import('./UserLogin/LoginPage'));
const Request = lazy(() => import('../Components/Requests/RequestPage'));
const Solution = lazy(() => import('./Solution'));
const PasswordReset = lazy(() => import('./UserLogin/PasswordReset'));
const NotFound = lazy(() => import('./Notfound'));
const RegisterPage = lazy(() => import('./UserLogin/RegisterUser'));
const Home = lazy(() => import('./HomePage/HomePage'));
const EditForm = lazy(() => import('../Components/Requests/CreateEditRequest'));
const TicketDetails = lazy(() => import('../Components/Requests/TicketDetails/TicketBody'));
const AccountDetails = lazy(() => import('../Components/HomePage/AccountDetails'));
const FormBuilder = lazy(() => import('../Components/HomePage/FormBuilder'))
const AssetsViewer = lazy(() => import('../Components/Assets/AssetsNavigation'))
const AssetMenuBuilder = lazy(() => import('../Components/Assets/AssetMenuBuilder'))


// export const routes = [
//   { path: '/login', element: <LoginPage /> },
//   { path: '/register-user', element: <RegisterPage /> },
//   { path: '/request', element: <Request /> },
//   { path: '/account-details', element: <AccountDetails /> },
//   { path: '/solution', element: <FormBuilder /> },
//   { path: '/assets', element: <AssetsViewer /> },
//   { path: '/asset-menu-builder', element: <AssetMenuBuilder /> },
//   { path: '/request/ticket/:ticketId', element: <TicketDetails /> },
//   { path: '/password_reset', element: <PasswordReset /> },
//   { path: '/home', element: <Home /> },
//   { path: '*', element: <NotFound /> },
// ];


export const routes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register-user", element: <RegisterPage /> },
  { path: "/request", element: <Request />, roles: ["user"] },
  { path: "/account-details", element: <AccountDetails />, roles: ["admin"] },
  { path: "/solution", element: <FormBuilder />, roles: ["admin"] },
  { path: "/assets", element: <AssetsViewer />, roles: ["user", "admin"] },
  { path: "/asset-menu-builder", element: <AssetMenuBuilder />, roles: ["admin"] },
  { path: "/request/ticket/:ticketId", element: <TicketDetails />, roles: ["user", "admin"] },
  { path: "/password_reset", element: <PasswordReset /> },
  { path: "/home", element: <Home />, roles: ["user", "admin"] },
  { path: "*", element: <NotFound /> },
];
