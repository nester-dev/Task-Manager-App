import { Avatar, Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import bgLight from '../assets/img/bgLight.png';

const styles = {
  paperContainer: {
    height: 680,
    backgroundImage: `url(${bgLight})`,
    backgroundRepeat: 'no-repeat',
  },
};

export const Welcome = () => {
  const { t, i18n } = useTranslation();

  const changeToRUS = () => {
    i18n.changeLanguage('ru');
  };

  const changeToRENG = () => {
    i18n.changeLanguage('en');
  };

  return (
    <main>
      <Paper style={styles.paperContainer}>
        <Button variant="contained" onClick={changeToRUS}>
          RU
        </Button>
        <Button variant="contained" onClick={changeToRENG}>
          EN
        </Button>
        <Container maxWidth="lg">
          <Typography variant="h1" gutterBottom>
            Project Management App
          </Typography>
          <Typography variant="h5">{t('welcomeHero')}</Typography>
          <Button variant="contained">{t('heroAboutBtn')}</Button>
        </Container>
      </Paper>
      <Container>
        <Typography variant="h2">{t('teamHeading')}</Typography>
        <Box>
          <Avatar src=""></Avatar>
          <Typography variant="h4">{t('teamSasha')}</Typography>
          <Typography variant="h6">{t('aboutSasha')}</Typography>
        </Box>
        <Box>
          <Avatar src=""></Avatar>
          <Typography variant="h4">{t('teamDima')}</Typography>
          <Typography variant="h6">{t('aboutDima')}</Typography>
        </Box>
        <Box>
          <Avatar src=""></Avatar>
          <Typography variant="h4">{t('teamOlya')}</Typography>
          <Typography variant="h6">{t('aboutOlya')}</Typography>
        </Box>
        <Box>
          <Avatar src=""></Avatar>
          <Typography variant="h4">{t('teamAleh')}</Typography>
          <Typography variant="h6">{t('aboutAleh')}</Typography>
        </Box>
      </Container>
      <Container>
        <Typography variant="h2">{t('usedTechnologies')}</Typography>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Box>React</Box>
          </Grid>
          <Grid item xs={4}>
            <Box>TypeScript</Box>
          </Grid>
          <Grid item xs={4}>
            <Box>React Router</Box>
          </Grid>
          <Grid item xs={4}>
            <Box>Redux toolkit query</Box>
          </Grid>
          <Grid item xs={4}>
            <Box>Material UI</Box>
          </Grid>
          <Grid item xs={4}>
            <Box>i18next</Box>
          </Grid>
          <Grid item xs={4}>
            <Box>React Hook Form</Box>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};
