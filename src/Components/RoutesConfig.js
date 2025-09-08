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


export const routes = [
  { path: '/login', element: <LoginPage /> },
  { path: '/register-user', element: <RegisterPage /> },
  { path: '/request', element: <Request /> },
  { path: '/account-details', element: <AccountDetails /> },
  { path: '/solution', element: <FormBuilder /> },
  { path: '/request/ticket/:ticketId', element: <TicketDetails /> },
  { path: '/password_reset', element: <PasswordReset /> },
  { path: '/home', element: <Home /> },
  { path: '*', element: <NotFound /> },
];
