import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    marginTop: '20px',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    width: '500px',
    position: 'relative',
    padding: theme.spacing(6),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(12),
      paddingRight: 0,
    },
  },
}));

export default function MainFeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(https://source.unsplash.com/random)` }}>
      {/* Increase the priority of the hero background image */}
      {/* {<img style={{ display: 'none' }} src="https://source.unsplash.com/random" alt="som" />} */}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h5" variant="h3" color="inherit" gutterBottom>
              Connecting people for better outcomes
            </Typography>
            <Typography variant="h6" color="inherit" paragraph>
              Personalized care technology leads to better outcome by allowing all community caregivers to collaborate through one common virtual care platform.
            </Typography>
            {/* <Link variant="subtitle1" href="#">
              some random link
            </Link> */}
            
            <Button variant="contained" color="primary">Sign up for free now</Button>

          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.object,
};