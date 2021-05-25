import React,{useState} from 'react';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
// import clsx from 'clsx';
// import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
// import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Container from '@material-ui/core/Container';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "../Axios";
import {validatePassword, validateEmail} from '../helper/validate.js'

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const useStyles = makeStyles((theme) => ({
  radio:{
    '&$checked':{
      color: '#3f51b5'
    }
  },
  checked: {},
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#3f51b5',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert:{
    width: '400px',
    marginTop: '10px',
  },
  aligncenter:{
    display:'flex',
    justifyContent:' center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: '5px',
    marginBottom: '10px',
    marginLeft: '-5px',
  },
  gendergroup:{
    display: 'flex',
    float: 'right',
    marginLeft: '30px'
  },
  clearance:{
    marginBottom: '200px',
  },
  genderlabel:{
    display:'flex',
    float:'left',
    marginTop: '0px',
    marginLeft: '15px'
  },
  fullsizepass:{
    width: '395px',
    // marginTop: '-18px',
  },
  shiftup:{
    marginTop: '0px',
    width: '190px',
  },
  warning:{
    marginTop: '15px',
  },
  upload:{
    marginTop: '2px',
    marginLeft: '10px',
    marginBottom: '0px',
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
      })

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4" color="textSecondary" className={classes.textdeco}>
          Sign up as Specialist
        </Typography>
        {emailError && <Alert className={classes.alert} severity="error">{emailError}</Alert>}
        
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
              {window.errorEmail && (window.errorEmail==="Enter valid Email!"? <Alert className={classes.warning} severity="warning">{window.errorEmail}</Alert> : <Alert className={classes.warning} severity="success">{window.errorEmail}</Alert>) }
              
            </Grid>
            <Grid item xs={12}>
            <FormControl className={classes.fullsizepass} variant="outlined">
              <InputLabel htmlFor="outlined">Password</InputLabel>
              <OutlinedInput
              fullWidth
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={doctor.password}
                
                onChange={(evt)=>{
                  window.errorPassword = (validatePassword(evt.target.value));
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
                labelWidth={160}
              />
            </FormControl>
            {window.errorPassword && (window.errorPassword==="Password is weak"? <Alert className={classes.warning} severity="warning">{window.errorPassword}</Alert> : <Alert className={classes.warning} severity="success">{window.errorPassword}</Alert>) }
            </Grid>
            
            <Grid item xs ={12} sm={6}>
{/* 
              <DatePicker
                variant="outlined"
                selected={doctor.dob}
                onChange={(date)=> {
                  setDoctor({...doctor, dob: date})
                  
                }}
                className="form-control"
                name="dob"
                placeholder="Date of Birth"
                maxDate={new Date()}
              /> */}
              <TextField
                id="date"
                label="Date of Birth"
                type="date"
                variant="outlined"
                value={doctor.dob}
                name="dob"
                className={classes.shiftup}
                inputProps={{
                  max: "2001-12-31"
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(evt)=> {
                  setDoctor({...doctor, dob: evt.target.value})
                  
                }}
              />

            </Grid>
            <Grid item xs ={12} sm={6}>
            <TextField
                className={classes.shiftup}
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
            <p className={classes.upload}>Upload Profile Picture</p>
            <Grid item xs ={12}>
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
            <Grid className={classes.aligncenter}>
            <FormLabel className={classes.genderlabel} component="legend" >Gender :</FormLabel>
            <RadioGroup row className={classes.gendergroup} aria-label="gender" name="gender" value={doctor.gender} onChange={(e)=> {setDoctor({...doctor, gender: e.currentTarget.value})}}>
              <FormControlLabel className={{root: classes.formControlLabelRoot, label: classes.formControlLabel}} value="female" control={<Radio classes={{root: classes.radio, checked: classes.checked}} />} label="Female" />
              <FormControlLabel className={{root: classes.formControlLabelRoot, label: classes.formControlLabel}} value="male" control={<Radio classes={{root: classes.radio, checked: classes.checked}} />} label="Male" />
              <FormControlLabel className={{root: classes.formControlLabelRoot, label: classes.formControlLabel}} value="other" control={<Radio classes={{root: classes.radio, checked: classes.checked}} />} label="Other" />
            </RadioGroup >
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{backgroundColor: '#22577A', color: '#FFFFFF'}}
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
    </Container>
  );
}