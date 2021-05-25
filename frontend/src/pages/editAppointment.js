import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
// import moment from 'moment'
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function EditAppointment(props) {
    const[data, setData] = useState('');
    // const [allDoctors, setAllDoctors] = useState([]);

    const appointmentId = props.match.params.id;

    const [appointment,setAppointment] = useState({
      doctorName: `${data.doctorName}`,
      patientName: `${data.firstName} ${data.lastName}`,
      date: new Date(),
      startDate: new Date(),

  });

  const editAppointment =(e)=>{
    e.preventDefault();
    axios.put(`http://localhost:5000/edit-appointment/${appointmentId}`,appointment).then((res)=>{
        console.log(res.data)
        props.history.goBack();
        alert("appointment changed");
    }).catch((err)=>{
        console.log(err)
        props.history.push(`/edit-appointment/${appointmentId}`)
        alert("some error occured")
    })
  }

    useEffect(()=>{
        async function getAppointment(){
            console.log(appointmentId)
            await axios.get(`http://localhost:5000/meeting/${appointmentId}`).then((res)=>{
                const response = res.data;
                setAppointment(response);
                console.log(response)
                setData(response)
            })
        }

        getAppointment();
    },[]);

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
        datefield:{
          width: '180px'
        },
        docfield:{
          width: '395px',
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
    
            <Container component="main" maxWidth="xs">
                <CssBaseline />
            <div className={classes.paper}>
    
        <Typography component="h1" variant="h5" color="textSecondary">
          Edit Appointment
        </Typography> 
        <form className={classes.form} noValidate onSubmit={editAppointment}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="patientName"
                name="patientName"
                variant="outlined"
                disabled
                value={`${appointment.patientName}`}
                // required
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
          
            <Grid item xs={12} >
        
              <TextField
                id="doctorName"
                // select
                className={classes.docfield}
                label="Doctor's Name"
                value={`${appointment.doctorName}`}
                disabled
                onChange={(e)=> {
                  setAppointment({...appointment, doctorName: e.target.value});
                }}
                // helperText="Select a specialist to consult"
                variant="outlined"
              >
                {/* {allDoctors.map((doc) => (
                  <MenuItem key={doc._id} value={doc.fullName}>
                    {doc.fullName}
                  </MenuItem>
                ))} */}
              </TextField>
            </Grid>
            
            <Grid item xs ={12} sm={6}>
            <TextField
                id="date"
                label="Date of appointment"
                type="date"
                variant="outlined"
                value={appointment.date}
                name="dob"
                className={classes.datefield}
                minDate={new Date()}
                inputProps={{
                  min: new Date()
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(evt)=> {
                  setAppointment({...appointment, date: evt.target.value})
                  
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="startDate"
                    label="Time of appointment"
                    type="time"
                    variant="outlined"
                    defaultValue="09:00"
                    value={appointment.startDate}
                    className={classes.fullsize}
                    onChange={
                      (e)=> {setAppointment({...appointment, startDate: e.target.value})
                    }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    inputProps={{
                    step: 1800, // 5 min
                    }}
                />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{backgroundColor: '#22577A', color: '#FFFFFF'}}
            className={classes.submit}
          >
            Edit Appointment
          </Button>
        </form>
      </div>
    </Container>
    )
}

export default EditAppointment

