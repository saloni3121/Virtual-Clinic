import React,{useEffect, useState} from 'react';
import axios from 'axios';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import lodash from 'lodash';

function BookAppointment(props) {

    const[data, setData] = useState('');

    const [allDoctors, setAllDoctors] = useState();

    const [appointment,setAppointment] = useState({
        doctorName: '',
        patientName: '',
        date: '',
        startTime: '',

    });
    const patientId = props.match.params.id;
    const handleChange = (e)=>{
        setAppointment({...appointment, [e.target.name]: e.target.value});
      }

    useEffect(()=>{

        async function getDoctors(){
            await axios.get("http://localhost:5000/register-doctor").then((res)=>{
                const response = res.data;
                console.log(response)
                // const array = lodash.values(response);
                // console.log(typeof(array))
                setAllDoctors(response);
            })
        }

        async function makeRequest() {
            await axios.get(`http://localhost:5000/patient-home/${patientId}`).then ((res)=>{
                const patient = res.data;
                setData(patient);
            })
        }
        makeRequest();
        getDoctors();
        // console.log(Object.entries(allDoctors));
        // allDoctors.forEach((doctor) => {
        //     console.log(doctor);
        //   });
    },[]);

    // console.log(Object.entries(allDoctors));
   


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
        fullsize:{
            width: '190px',
        }
      }));
      
    const classes = useStyles();
    return (
        <div>
            <h1>Book an Appointment</h1>
            {/* <h2>Patient's name {data.firstName}</h2> */}
            <Container component="main" maxWidth="xs">
                <CssBaseline />
            <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography> */}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="doctorName"
                name="patientName"
                variant="outlined"
                value={`${data.firstName} ${data.lastName}`}
                required
                fullWidth
                id="patientName"
                label="Patient's Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
          {/* <Grid container spacing={2}> */}
            <Grid item xs={12} >
              {/* <TextField
                autoComplete="doctorName"
                name="doctorName"
                variant="outlined"
                value={appointment.doctorName}
                required
                fullWidth
                id="doctorName"
                label="Doctor's Name"
                autoFocus
                onChange={handleChange}
              /> */}
            {/* <TextField
                id="standard-select-currency"
                select
                label="Select"
                // value={currency}
                onChange={handleChange}
                helperText="Please select your currency"
                >
                {allDoctors.forEach((option) => (
                    <MenuItem key={option.fullName} value={option.fullName}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField> */}
            </Grid>
            
            <Grid item xs ={12} sm={6}>
            <TextField
              variant="outlined"
              id="date"
              label="Date"
              type="date"
              name ="date"
              value={appointment.date}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(evt)=> setAppointment({...appointment,date: evt.target.value})}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="time"
                    label="Time of appointment"
                    type="time"
                    variant="outlined"
                    defaultValue="07:30"
                    className={classes.fullsize}
                    onChange={handleChange}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    inputProps={{
                    step: 1800, // 5 min
                    }}
                />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
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
              />
            </Grid> */}
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Book an Appointment
          </Button>
          {/* <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
        </div>
    )
}

export default BookAppointment
