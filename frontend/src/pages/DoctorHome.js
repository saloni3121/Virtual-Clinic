import React from 'react';
import Scheduler from '../components/Scheduler.js';

function DoctorHome(props) {
    // console.log(p)
    // const =props.params.match.id
    return (
        <div>
            <Scheduler id={props.match.params.id}></Scheduler>
        </div>
    )
}

export default DoctorHome





// useEffect(()=>{
//     async function makeRequest() {
//         await axios.get(`http://localhost:5000/doctor-home/${doctorId}`).then ((res)=>{
//         const response = res.data;
//             console.log(response)
//             setDoctor(response);
//             setAllAppointments(response.appointments);
//         })
//     }
//     makeRequest();
// },[]);