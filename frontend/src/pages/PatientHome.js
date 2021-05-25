import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Carousel from "react-elastic-carousel";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';


  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];


  const useStyles = makeStyles({
    root: {
      width: '320px',
      display: 'inline-block',
      marginRight: '20px',
      border: '1px solid #000'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    contain:{
        marginTop: '100px',
        marginRight: '20px',
        marginLeft: '20px'
    },
    aligncenter:{
        marginLeft: '120px'
    },
  });

function PatientHome(props) {

    const[data, setData] = useState('');
    const[appointments, setAppointments] = useState([]);

    const patientId = props.match.params.id
    useEffect(()=>{


         function makeRequest() {
            axios.get(`http://localhost:5000/patient/${patientId}`).then ((res)=>{
                const response = res.data;
                setData(response);
                setAppointments(response.appointments)
            })
        }
    makeRequest();
    },[]);

    function logout(){
        axios.get("http://localhost:5000/logout").then((res)=>{
            props.history.push('/login')
        })
    }

    let id = data._id;

     

    //   const classes = useStyles();
        const classes = useStyles();
        const bull = <span className={classes.bullet}>•</span>;
    return (
        <div>
            <h1>Patient Home</h1>
            <h2>{data.firstName}</h2>
            <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
            <Link to = {`/book-appointment/${id}`} >
                <Button variant="contained" color="primary" >
                    Book an appointment 
                </Button>
            </Link>
            <div className={classes.contain}>
            <Carousel  breakPoints={breakPoints}>
                {appointments.map((app)=> (
                    
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {app.doctorName}
                        </Typography>
                        <Typography variant="h5" component="h2">
                        {app.date}{bull}nev{bull}o{bull}lent
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        adjective
                        </Typography>
                        <Typography variant="body2" component="p">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link>
                        <Button className ={classes.aligncenter}size="small">Learn More</Button>
                        </Link>
                    </CardActions>
                </Card>
               
                ))}
                  </Carousel>
            </div>
        </div>
    )
}

export default PatientHome
