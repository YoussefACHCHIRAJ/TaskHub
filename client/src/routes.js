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
import TeamPage from './pages/TeamPage';
import ProfilePage from './pages/ProfilePage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'members', element: <MembersPage /> },
        { path: 'tasks', element: <TasksPage /> },
        { path: 'team', element: <TeamPage /> },
        { path: 'profile', element: <ProfilePage />, },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'profile',
      element: <ProfilePage />,
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
