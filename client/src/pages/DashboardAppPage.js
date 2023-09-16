import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
// import Iconify from '../components/iconify';
// sections
import {
  AppNewsUpdate,
  AppOrderTimeline,
  AppWebsiteVisits,
  AppWidgetSummary,
  AppCurrentSubject,
} from '../sections/@dashboard/app';
import useGetDefaultInfo from '../hooks/useGetDefaultInfo';
import useAuthContext from '../hooks/useAuthContext';
import { fDateTime } from '../utils/formatTime';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const { user } = useAuthContext();
  const { error, isLoading, defaultInfo } = useGetDefaultInfo(`http://localhost:3001/defaultInfo/${user.member.name}`);

  
  const { memberNumber, tasksNumber, userTasksNumber } = defaultInfo !== null ? defaultInfo : 0;
  const tasks = defaultInfo !== null ? defaultInfo.tasks : [];
  if (isLoading) return null;
  console.log(tasks);
  return (
    <>
      <Helmet>
        <title> Dashboard | TaskHub </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
        {error && <Typography variant='body2'>{error}</Typography>}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Members" total={memberNumber} icon={'ri:user-fill'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Tasks" color="error" total={tasksNumber} icon={'fluent:tasks-app-20-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Your Tasks" color="success" total={userTasksNumber} icon={'fluent:tasks-app-20-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Tasks"
              list={tasks.map(task => ({
                id: task._id,
                title: task.title,
                postedAt: fDateTime(task.createdAt)
              }))}
            />
            {/* <Typography variant='subtitle1'>There is no new tasks</Typography> */}
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Technologies using"
              chartLabels={['Nodejs & Express', 'Laravel', 'React', 'VueJs', 'Jest', 'PHPUnit']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AppWebsiteVisits
              title="Tasks"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Tasks',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                }
              ]}
            />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
