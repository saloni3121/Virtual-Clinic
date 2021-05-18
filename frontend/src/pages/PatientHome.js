import React,{useState, useEffect} from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import axios from 'axios';

function PatientHome(props) {

    const[data, setData] = useState('');
    console.log(props)
    console.log(props.match.params.id)
    const patientId = props.match.params.id
    useEffect(()=>{
        async function makeRequest() {
            await axios.get(`http://localhost:5000/patient-home/${patientId}`).then ((res)=>{
                const response = res.data;
                console.log(response);
                setData(response);
            })
        }
        makeRequest();
    },[]);

    let id = data._id
    return (
        <div>
            <h1>Patient Home</h1>
            <h2>{data.firstName}</h2>
            <Link to = {`/patient-home/${id}/book-appointment`} >
                <Button variant="contained" color="primary" >
                    Book an appointment 
                </Button>
            </Link>
        </div>
    )
}

export default PatientHome
