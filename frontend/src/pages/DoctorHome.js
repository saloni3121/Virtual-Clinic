import React,{useEffect, useState} from 'react'
import axios from 'axios'

function DoctorHome(props) {

    const[data, setData] = useState('');
    const [allAppointments, setallAppointments] = useState([]);

    console.log(props)
    console.log(props.match.params.id)
    const doctorId = props.match.params.id
    useEffect(()=>{
        async function makeRequest() {
            await axios.get(`http://localhost:5000/doctor-home/${doctorId}`).then ((res)=>{
                const response = res.data;
                // console.log(response.appointments);
                setData(response);
                setallAppointments(response.appointments);
                console.log(allAppointments)
            })
        }
        makeRequest();
    },[allAppointments]);

    return (
        <div>
            <h1>Doctor Home</h1>
            <h2>{data.firstName}</h2>
            {allAppointments.map((app)=>(
                <h3>{app.patientName}</h3>
            ))}
            <img style={{width: '200px',height: 'auto'}} src={data.image} alt="profile-img" />
        </div>
    )
}

export default DoctorHome
