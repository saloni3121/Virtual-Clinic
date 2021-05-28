import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    height: 'auto',
    margin: '150px auto',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 38,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function PrescriptionCard(props) {

  console.log(props.match.params.id)
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [appointment, setAppointment] = useState([]);
  const [doctor, setDoctor] = useState('');
  const [prescription, setPrescription] = useState('')
  const [medicines, setMedicines] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  console.log(isLoaded)

  useEffect(() => {
      axios.get(`http://localhost:5000/meeting/${props.match.params.id}`)
      .then(res => {

        setTimeout(()=>{
          const app = res.data;
          // console.log(appointment.doctor.clinicContact)
          setAppointment(app)
          setDoctor(app.doctor)
          setPrescription(app.prescription)
          setMedicines(app.prescription.medicine)
          console.log(medicines)
          setIsLoaded(true)
        },300)

      })
  }, [])

  return (
    <>
    {isLoaded?
          <>
          <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Prescription
            </Typography>
            <Typography variant="h6" component="h2" style={{marginTop: '-15px'}}>
              by {appointment.doctorName}
            </Typography>
            <Typography variant="h6" component="h2" style={{backgroundColor: '#b2b2b2',marginTop: '15px',width:'580px',marginLeft: '-55px'}}>
            {prescription.diagnosis}
            </Typography>
            <Typography variant="body2" component="p">
              <ul style={{marginTop: '30px'}}>
                {medicines.map(med => (
                    <p style={{backgroundColor: '#b2b2b2', width: '500px',marginLeft: '-55px',marginTop: '10px',marginBottom: '10px', padding: '15px'}}>
                    <p style={{display: 'inline-block'}}>Medicine Name:</p>
                    <p style={{display: 'inline-block', fontWeight: '700'}}>  {med.value}</p> 
                    <br></br>
                    <p 
                      style={{display: 'inline-block',marginTop: '-20px'}}>
                          Instructions:
                    </p> 
                    <p style={{display: 'inline-block',marginTop: '-20px', fontWeight: '700'}}>
                        {med.instruction}
                    </p>
                  </p>
                ))} 

              </ul>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" style={{backgroundColor: '#22577A',color: '#fff',margin: '0px auto',padding : '10px 10px',marginBottom: '20px'}}>
              Call {doctor.clinicContact} for any queries
            </Button>
          </CardActions>
        </Card>
    </> :
    <>
    <CircularProgress/>
    </>
    }

    </>
  );
}