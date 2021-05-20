import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {
    CBadge,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
    CCollapse,
    CFade,
    CSwitch,
    CLink
  } from  '@coreui/react'

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

    let id = data._id

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
            <div>
                {appointments.map((app)=> (
                    <CCol xs="12" sm="6" md="4">
                    <CCard color="gradient-secondary">
                      <CCardHeader>
                        {app.doctorName}
                      </CCardHeader>
                      <CCardBody>
                        {app.date}
                        {app.startDate}
                        {app.endDate}
                      </CCardBody>
                    </CCard>
                  </CCol>
                ))}
            </div>
        </div>
    )
}

export default PatientHome
