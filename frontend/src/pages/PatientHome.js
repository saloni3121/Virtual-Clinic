import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Carousel from "react-elastic-carousel";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CardActionArea from '@material-ui/core/CardActionArea';
import Navbar from '../components/Navbar'
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import CardMedia from '@material-ui/core/CardMedia';
import SearchBar from '../components/SearchBar';
import DoctorCarousel from '../components/DoctorCarousel';
import Footer from '../components/Footer';


  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];


  const useStyles = makeStyles((theme)=> ({
    root: {
      width: '320px',
      display: 'inline-block',
      marginRight: '20px',
      border: '1px solid #b2b2b2'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    //   fontSize: '28px',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    contain:{
        marginTop: '70px',
        marginRight: '20px',
        marginLeft: '20px'
    },
    aligncenter:{
        marginLeft: '120px'
    },
    button: {
        margin: theme.spacing(1),
    },
  }));

function PatientHome(props) {


    console.log(props)
    const[data, setData] = useState('');
    const[appointments, setAppointments] = useState([]);

    const deleteAppointment = (id) =>{
        axios.delete(`http://localhost:5000/delete/${id}`).then(()=>{
            window.location.reload(false);
          })
    }

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

    const compareDates = (date)=>{
        return new Date(date)<=new Date()
    }

    let id = data._id;
    let images= [
        "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80",
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
        "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
        "https://images.unsplash.com/photo-1579165466949-3180a3d056d5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
        "https://images.unsplash.com/photo-1609831647099-baaadf7dd44d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1585928642599-31f15a88c002?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
        "https://images.unsplash.com/photo-1596942273255-16aa79a98a28?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
    ]
        const classes = useStyles();
        const bull = <span className={classes.bullet}>•</span>;
        const appoint = appointments.slice(0,4);
        let disable = true;
    return (
        <div>
            <Navbar loggedIn={true} logout={logout} isPatient={true} id={props.match.params.id}/>
            <h2>Hello,  {data.firstName} {data.lastName} ! </h2>
            <SearchBar id ={id}/>
            <div className={classes.contain}>
            {/* <Carousel  breakPoints={breakPoints}> */}
            <Typography variant="h4" style={{color: '#000', marginBottom: '20px'}} component="p">
                Your recent appointments
            </Typography>
                {appoint.map((app)=> (
                    <>
                    {app.date <= new Date()? disable=true : disable= false}
                    {/* <h1>{disable}</h1> */}
                    <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={images[Math.floor(Math.random()*images.length)]}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {app.doctorName}
                        </Typography>
                        <Typography variant="h6" color="textSecondary" component="p">
                            {new Date(app.date).toLocaleDateString(undefined, {day:'2-digit'}) + '-' + new Date(app.date).toLocaleDateString(undefined, {month:'short'}) + '-' + new Date(app.date).toLocaleDateString(undefined, {year:'numeric'})} {bull} {app.date.toString().slice(11,16)}
                        </Typography>
                        <Button 
                            variant="contained" 
                            style={{backgroundColor:"#B0D4B8",marginTop:'10px', marginBottom: '-10px'}} 
                            className={classes.button} 
                            href={`/edit-appointment/${app._id}`} 
                        >
                            View Prescription
                        </Button>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                        {/* {app.date <= new Date() ? disabled= true : disabled=false} */}
                        <Button
                            variant="contained"
                            // {app.date<=new Date() && disabled}
                            color="secondary"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                            onClick={()=> deleteAppointment(app._id)}
                            disabled={disable}
                        >
                            Delete
                        </Button>
                        <Button 
                            style={{marginLeft:"-2px"}} 
                            href={`/meeting/${app._id}`} 
                            variant="contained" color="primary" 
                        >
                            Link
                        </Button>
                        <Button 
                            variant="contained" 
                            style={{backgroundColor:"#ffc107"}} 
                            className={classes.button} 
                            startIcon={<EditIcon />} 
                            href={`/edit-appointment/${app._id}`} 
                        >
                            Edit
                        </Button>
                    </CardActions>
                  </Card>
                  </>
                // <Card className={classes.root} key={app._id}>
                //     <CardContent>
                //         <Typography className={classes.title} color="textSecondary" gutterBottom>
                       
                //         </Typography>
                //         <Typography variant="h5" component="h2">
                //         {app.doctorName}
                //         </Typography>
                //         <Typography className={classes.pos} color="textSecondary">
                //         {app.date.toString().slice(0,9)}{bull}{app.date.toString().slice(11,16)}
                //         </Typography>
                      
                //     </CardContent>
                //     <CardActions>
                        
                //         <Button
                //             variant="contained"
                //             color="secondary"
                //             className={classes.button}
                //             startIcon={<DeleteIcon />}
                //             onClick={()=> deleteAppointment(app._id)}
                //         >
                //             Delete
                //         </Button>
                //         <Button 
                //             style={{marginLeft:"-2px"}} 
                //             href={`/meeting/${app._id}`} 
                //             variant="contained" color="primary" 
                //         >
                //             Link
                //         </Button>
                //         <Button 
                //             variant="contained" 
                //             style={{backgroundColor:"#ffc107"}} 
                //             className={classes.button} 
                //             startIcon={<EditIcon />} 
                //             href={`/edit-appointment/${app._id}`} 
                //         >
                //             Edit
                //         </Button>
                //     </CardActions>
                // </Card>
               
                ))}
                  {/* </Carousel> */}
            </div>
            <DoctorCarousel/>
            <Footer/>
        </div>
    )
}

export default PatientHome



