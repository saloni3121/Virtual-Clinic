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
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import moment from 'moment'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function BookAppointment(props) {

    const[data, setData] = useState('');
    const [allDoctors, setAllDoctors] = useState([]);

    const patientId = props.match.params.id;

    const [appointment,setAppointment] = useState({
      doctorName: '',
      patientName: `${data.firstName} ${data.lastName}`,
      date: new Date(),
      startTime: new Date(),

  });

  const bookAppointment =(e)=>{
    e.preventDefault();
    axios.post(`http://localhost:5000/book-appointment/${patientId}`,appointment).then((res)=>{
      props.history.push('/patient-home/'+ patientId);
      alert("appointment booked");
    }).catch((err)=>{
      console.log(err)
      props.history.push(`patient-home/${patientId}/book-appointment`)
    })
  }

    useEffect(()=>{

        async function getDoctors(){
            await axios.get("http://localhost:5000/register-doctor").then((res)=>{
                const response = res.data;
                setAllDoctors(response);
            })
        }

        async function makeRequest() {
            await axios.get(`http://localhost:5000/patient-home/${patientId}`).then ((res)=>{
                const patient = res.data;
                setData(patient);
                // setAppointment({...appointment,patientName: res.data.firstName + res.data.lastName})
                // console.log(patient)
            })
        }
        makeRequest();
        getDoctors();

    },[allDoctors]);

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
      
      console.log(appointment);

    const classes = useStyles();
    const yesterday = moment().subtract(1, 'day');
    const disablePastDt = current => {
        return current.isAfter(yesterday);
    }
    // console.log(allDoctors);s
    return (
    
            <Container component="main" maxWidth="xs">
                <CssBaseline />
            <div className={classes.paper}>
    
        <Typography component="h1" variant="h5">
          Book an Appointment
        </Typography> 
        <form className={classes.form} noValidate onSubmit={bookAppointment}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="patientName"
                name="patientName"
                variant="outlined"
                value={`${data.firstName} ${data.lastName}`}
                required
                fullWidth
                id="patientName"
                label="Patient's Name"
                autoFocus
                onBeforeInput =  {(e)=> 
                  setAppointment({...appointment, patientName: e.target.value})}
                onChange={(e)=> {
                  setAppointment({...appointment, patientName: e.target.value});
                }}
              />
            </Grid>
          {/* <Grid container spacing={2}> */}
            <Grid item xs={12} >
        
              <TextField
                id="doctorName"
                select
                label="Select"
                value={appointment.doctorName}
                onChange={(e)=> {
                  setAppointment({...appointment, doctorName: e.target.value});
                  console.log(e.target.value)
                }}
                helperText="Select the doctor to consult"
                variant="outlined"
              >
                {allDoctors.map((doc) => (
                  <MenuItem key={doc._id} value={doc.fullName}>
                    {doc.fullName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item xs ={12} sm={6}>
            {/* <TextField
              variant="outlined"
              id="date"
              label="Date for appointment"
              type="date"
              name ="date"
              value={appointment.date}
              
              // className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(evt)=> {
                setAppointment({...appointment, date: evt.target.value})
                console.log(evt.target.value)
              }}
              max={moment().format("YYYY-MM-DD")}
            /> */}
             <DatePicker
                selected={appointment.date}
                onChange={(date)=> {
                  setAppointment({...appointment, date: date})
                  // console.log(evt.target.value)
                }}
                // className="form-control"
                name="date"
                placeholder="Date of Birth"
                minDate={new Date()}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="startTime"
                    label="Time of appointment"
                    type="time"
                    variant="outlined"
                    defaultValue="09:00"
                    value={appointment.startTime}
                    className={classes.fullsize}
                    onChange={
                      (e)=> {setAppointment({...appointment, startTime: e.target.value})
                      console.log(e.target.value)
                    }}
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
    )
}

export default BookAppointment

