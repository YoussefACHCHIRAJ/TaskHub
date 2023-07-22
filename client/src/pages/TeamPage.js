import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';
import { Container, Grid, Stack } from '@mui/material';

export default function MediaCard() {

  const [members] = React.useState([
    { name: "Mohamed CHARRAFI", role: "Backend", technologie: "Tall Stack | Larvel" },
    { name: "Youssef AIT BAHSSIN", role: "Frontend", technologie: "React" },
    { name: "Houssame NOUMA", role: "Frontend", technologie: "Angulaire" },
    { name: "Salma AITOURIRE", role: "Backend", technologie: "Spring" },
  ])
  return (
    <>
      <Helmet>
        <title>Team | Minimal UI </title>
      </Helmet>

      <Container sx={{ marginBottom: '.5em' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <Typography variant='h4'>
            Team
          </Typography>
          <Typography variant='p'>
            Team admin: Youssef ACHCHIRAJ
          </Typography>
        </Stack>
      </Container>
      <Grid
        container
        spacing={.5}
      >
        {members.map((member, index) => (
          <Grid key={index} item>
            <Card sx={{ maxWidth: 300, marginBottom: '1em' }}>

              <CardContent>

                <Typography gutterBottom variant="h5" component="div">
                  {member.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {member.technologie}
                </Typography>

                <Typography variant='body2' color="text.secondary">
                  Role: {member.role}
                </Typography>

              </CardContent>

              <CardActions>
                <Button size="small">Profile</Button>
              </CardActions>

            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}