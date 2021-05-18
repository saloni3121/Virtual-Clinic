import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import axios from '../Axios.js';
// import validator from 'validator';
import {validatePassword, validateEmail} from '../helper/validate.js'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  aligncenter:{
    display:'flex',
    justifyContent:' center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: '5px',
    marginBottom: '10px',
  },
  gendergroup:{
    display: 'flex',
    float: 'right',
    marginLeft: '30px'
  },
  genderlabel:{
    display:'flex',
    float:'left',
    marginTop: '2px',
    marginLeft: '15px'
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  
  const [emailError, setEmailError] = useState('')
 
  // let errorEmail='';
  // let errorPassword='';

  const [patient,setPatient] = useState({
    firstName: '',
    lastName: '',
    email:'',
    password: '',
    dob: new Date(),
    phoneNumber: '',
    gender: '',
    });

    const handleChange = (e)=>{
      setPatient({...patient, [e.target.name]: e.target.value});
    }

  const createPatient = (evt) =>{
    evt.preventDefault();
    axios.post('http://localhost:5000/register-patient',patient).then((response)=>{
        props.history.push('/login')
      }).catch((error)=>{
        if(error.response.status === 409){
          setEmailError('Email already exists')
        }
          props.history.push('/register-patient');

      })
  }

    return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={createPatient}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={patient.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={patient.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={patient.email}
                onChange={e => 
                          	{
                            	handleChange(e) ; 
                            	window.errorEmail = (validateEmail(e.target.value));
                          	}
                        }
              />
              <h5>{(emailError)? emailError: window.errorEmail}</h5>
            </Grid>
            <Grid item xs={12}>
              <TextField
					variant="outlined"
					required
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
					autoComplete="current-password"
					value={patient.password}
					onChange={e =>{
                            	handleChange(e) ;
                            	window.errorPassword = validatePassword(e.target.value);
                          	}
                        }
              />
              <h5>{window.errorPassword}</h5>
            </Grid>
            <Grid item xs ={12} sm={6}>
            <TextField
              variant="outlined"
              id="date"
              label="Date of Birth"
              type="date"
              value={patient.dob}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(evt)=> setPatient({...patient,dob: evt.target.value})}
            />
            </Grid>
            <Grid item xs ={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              type="number"
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              autoComplete="phoneNumber"
              value={patient.phoneNumber}
              onChange={handleChange}
            />
            </Grid>
            <Grid className={classes.aligncenter}>
            <FormLabel className={classes.genderlabel} component="legend" >Gender</FormLabel>
            <RadioGroup row className={classes.gendergroup} aria-label="gender" name="gender1" value={patient.gender} onChange={(e)=> setPatient({...patient, gender: e.currentTarget.value})}>
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup >
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}