import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import clsx from 'clsx';
// import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
// import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Container from '@material-ui/core/Container';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "../Axios";
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

  const [doctor,setDoctor] = useState({
    firstName: '',
    lastName: '',
    email:'',
    password: '',
    dob:new Date(),
    clinicContact: '',
    gender: '',
    specialisation:'',
    image: '',
    });

    const handleChange = (e)=>{
      setDoctor({...doctor, [e.target.name]: e.target.value});
    }

    const handleImg = (event)=>{
      var file = event.target.files[0];
      const reader = new FileReader(file);
      reader.readAsDataURL(file)
      
      reader.onload = () => {
        setDoctor({...doctor,image: reader.result});
      }
    }

    const [emailError, setEmailError] = useState('')

    const [showPassword,setShowPassword] = useState(false)
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

  const createDoctor= (evt) =>{
    evt.preventDefault();
    axios.post('http://localhost:5000/register-doctor',doctor).then((req,response)=>{

      props.history.push('/login')
      }).catch((error)=>{
          console.log(error);
          setEmailError('Email already exists')
          props.history.push('/register-doctor')
          alert("error")
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
        <form className={classes.form} noValidate  encType='multipart/form-data' onSubmit={createDoctor}>
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
                value={doctor.firstName}
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
                value={doctor.lastName}
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
                value={doctor.email}
                onChange={(e)=>{handleChange(e);
                  window.errorEmail = (validateEmail(e.target.value));
                }}
              />
              <h5>{(emailError)? emailError: window.errorEmail}</h5>
            </Grid>
            <Grid item xs={12}>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={doctor.password}
                onChange={(evt)=>{
                  setDoctor({
                      ...doctor, password: evt.target.value
                  })
              }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={120}
              />
            </FormControl>




              <h5>{window.errorPassword}</h5>
            </Grid>
            
            <Grid item xs ={12} sm={6}>

              <DatePicker
                selected={doctor.dob}
                onChange={(date)=> {
                  setDoctor({...doctor, dob: date})
                  
                }}
                className="form-control"
                name="dob"
                placeholder="Date of Birth"
                maxDate={new Date()}
              />
            </Grid>
            <Grid item xs ={12} sm={6}>
            <TextField
                variant="outlined"
                required
                fullWidth
                name="clinicContact"
                label="Clinic Contact"
                id="clinicContact"
                autoComplete="clinicContact"
                value={doctor.clinicContact}
                onChange={handleChange}
              />
            </Grid>
            <Grid className={classes.aligncenter}>
            <FormLabel className={classes.genderlabel} component="legend" >Gender :</FormLabel>
            <RadioGroup row className={classes.gendergroup} aria-label="gender" name="gender" value={doctor.gender} onChange={(e)=> {setDoctor({...doctor, gender: e.currentTarget.value})}}>
              <FormControlLabel value="female" control={<Radio/>} label="Female" />
              <FormControlLabel value="male" control={<Radio/>} label="Male" />
              <FormControlLabel value="other" control={<Radio/>} label="Other" />
            </RadioGroup >
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="specialisation"
                label="Your specialisation"
                name="specialisation"
                autoComplete="specialisation"
                value={doctor.specialisation}
                onChange={handleChange}
              />
            </Grid>
            <Grid container justify="flex-end">
            <TextField
              variant="outlined"
              required
              fullWidth
              type="file"
              id="image"
              accept="image/*"
              name="image"
              autoComplete="image"
              onChange={handleImg}
            />
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
              <Link href="#" variant="body2">
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