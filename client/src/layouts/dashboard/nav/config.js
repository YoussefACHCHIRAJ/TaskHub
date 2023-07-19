// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = name => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'members',
    path: '/dashboard/members',
    icon: icon('ic_user'),
  },
  {
    title: 'Tasks',
    path: '/dashboard/tasks',
    icon: icon('ic_tasks'),
  },
  {
    title: 'Team',
    path: '/dashboard/team',
    icon: icon('ic_team'),
  },
];

export default navConfig;