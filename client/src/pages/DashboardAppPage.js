import React from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Alert, AlertTitle, CircularProgress } from '@mui/material';
// components
// import Iconify from '../components/iconify';
// sections
import {
  AppNewsUpdate,
  AppWebsiteVisits,
  AppWidgetSummary,
  AppCurrentSubject,
} from '../sections/@dashboard/app';
import useGetDefaultInfo from '../hooks/useGetDefaultInfo';
import useAuthContext from '../hooks/useAuthContext';
import { fDateTime } from '../utils/formatTime';

// ----------------------------------------------------------------------
const CHARTMONTHS = [
  { 1: '01/01/2023' },
  { 2: '02/01/2023' },
  { 3: '03/01/2023' },
  { 4: '04/01/2023' },
  { 5: '05/01/2023' },
  { 6: '06/01/2023' },
  { 7: '07/01/2023' },
  { 8: '08/01/2023' },
  { 9: '09/01/2023' },
  { 10: '10/01/2023' },
  { 11: '11/01/2023' },
  { 12: '12/01/2023' },
]
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const { auth } = useAuthContext();
  const { error, isLoading, data: defaultInfo } = useGetDefaultInfo(`http://localhost:3001/defaultInfo/${auth.user._id}`);

  if (isLoading) return <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} disableShrink />

  if (error) return (<Typography variant='h6' color='error' sx={{ paddingInline: '3em' }}>
    <Alert severity="error">
      <AlertTitle>error</AlertTitle>
      {error.message}<br />
      This could be due a server issue.<br />
      Check if you are connecting to the server or internet.<br />
    </Alert>
  </Typography>)

  const { tasksCount, teamMembersCount, authUserTaskCount, tasks, chartTask } = defaultInfo;


  
  return (
    <>
      <Helmet>
        <title> Dashboard | TaskHub </title>
      </Helmet>
      {error && <Typography variant='h6' color='error' sx={{ paddingInline: '3em' }}>
        <Alert severity="error">
          <AlertTitle>error</AlertTitle>
          {error.message}
        </Alert>
      </Typography>}

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Members" total={teamMembersCount} icon="ri:user-fill" />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Tasks" color="error" total={tasksCount} icon="fluent:tasks-app-20-filled" />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Your Tasks" color="success" total={authUserTaskCount} icon="fluent:tasks-app-20-filled" />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Tasks"
              list={tasks.map(task => ({
                id: task._id,
                title: task.title,
                postedAt: fDateTime(task.createdAt)
              })).reverse()}
            />

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
              chartLabels={CHARTMONTHS.map((month, index) => month[index + 1])}
              chartData={[
                {
                  name: 'Tasks',
                  type: 'area',
                  fill: 'gradient',
                  data: CHARTMONTHS.map((_, index) => {
                    const data = chartTask.find(data => data.month === index + 1);
                    return data ? data.count : 0;
                  }),
                }
              ]}
            />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
