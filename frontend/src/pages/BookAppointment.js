import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
// import moment from 'moment'
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function BookAppointment(props) {

    const[data, setData] = useState('');
    const [allDoctors, setAllDoctors] = useState([]);

    const patientId = props.match.params.id;

    const [appointment,setAppointment] = useState({
      doctorName: '',
      patientName: `${data.firstName} ${data.lastName}`,
      date: new Date(),
      startDate: new Date(),

  });

  
  const handleFile = (event)=>{
    var file = event.target.files[0];
      const reader = new FileReader(file);
      reader.readAsDataURL(file)
      // console.log(file)
      reader.onload = () => {
        setAppointment({...appointment,file: reader.result});
      }
  }

  const bookAppointment =(e)=>{
    e.preventDefault();
    console.log(appointment.file)
    axios.post(`http://localhost:5000/book-appointment/${patientId}`,appointment).then((res)=>{
      props.history.push('/patient-home/'+ patientId);
      alert("appointment booked");
      window.location.reload(false);
    }).catch((err)=>{
      console.log(err)
      props.history.push(`/book-appointment/${patientId}`)
      alert("some error occured")
    })
  }

    useEffect(()=>{

        async function getDoctors(){
            await axios.get("http://localhost:5000/doctor").then((res)=>{
                const response = res.data;
                setAllDoctors(response);
            })
        }

        async function makeRequest() {
            await axios.get(`http://localhost:5000/patient/${patientId}`).then ((res)=>{
                const patient = res.data;
                setData(patient);
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
    // console.log(new Date())
    
    return (
    
            <Container component="main" maxWidth="xs">
                <CssBaseline />
            <div className={classes.paper}>
    
        <Typography component="h1" variant="h5" color="textSecondary">
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
          
            <Grid item xs={12} >
        
              <TextField
                id="doctorName"
                select
                className={classes.docfield}
                label="Select a specialist to consult"
                value={appointment.doctorName}
                onChange={(e)=> {
                  setAppointment({...appointment, doctorName: e.target.value});
                }}
                // helperText="Select a specialist to consult"
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
            <TextField
                id="date"
                label="Date of appointment"
                type="date"
                variant="outlined"
                value={appointment.date}
                name="dob"
                className={classes.datefield}
                inputProps={{ min: "25-05-2021"}}
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
            <Grid item xs ={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              type="file"
              id="file"
              accept="*"
              name="file"
              autoComplete="file"
              onChange={handleFile}
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
            Book an Appointment
          </Button>
        </form>
      </div>
    </Container>
    )
}

export default BookAppointment

