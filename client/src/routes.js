import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import MembersPage from './pages/MembersPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import TasksPage from './pages/TasksPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRouter, { ProtectLoginPage } from './utils/ProtectedRouter';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <ProtectedRouter element={<DashboardAppPage />} /> },
        { path: 'members', element: <ProtectedRouter element={<MembersPage />} /> },
        { path: 'tasks', element: <ProtectedRouter element={<TasksPage />} /> },
        { path: 'profile', element: <ProtectedRouter element={<ProfilePage />} /> },
      ],
    },
    {
      path: '/login',
      element: <ProtectLoginPage loginPage={<LoginPage />} />,
    },
    {
      path: 'profile',
      element: <ProtectedRouter element={<ProfilePage />} />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
