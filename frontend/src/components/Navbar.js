import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    // flexGrow: 1,
    cursor: 'pointer',
    // marginLeft: '-150px',
  },
  navlink:{
      marginRight: '10px',
      textDecoration: 'none'
  },
  bg:{
      backgroundColor: '#000',
  },
  allnav:{
      marginLeft: '860px',
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.bg}position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Clinic Name
          </Typography>
          <Typography className = {classes.allnav}>
            <Button className={classes.navlink} color="inherit">About</Button>
            <Button className={classes.navlink}  color="inherit">Services</Button>
            <Button className={classes.navlink}  color="inherit">Specialists</Button>
            <Button className={classes.navlink}  color="inherit">Precaution</Button>
            <Button className={classes.navlink}  color="inherit">Login</Button>
          </Typography>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}