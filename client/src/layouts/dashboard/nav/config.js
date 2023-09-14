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
    title: 'Your Task',
    path: '/dashboard/yourtasks',
    icon: icon('dailyTAsk'),
  },
];

export default navConfig;
