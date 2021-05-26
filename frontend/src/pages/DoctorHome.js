import React from 'react';
// import Button from '@material-ui/core/Button';
import Navbar from '../components/Navbar'
import Scheduler from '../components/Scheduler.js';
import axios from "axios"

function DoctorHome(props) {

    async function logout(){
        await axios.get("http://localhost:5000/logout").then((res)=>{
            props.history.push('/')
        }).catch((err)=>{
            console.log(err);
        })
    }
    return (
        <div>
            {/* <Button variant="contained" color="secondary" onClick={logout}>Logout</Button> */}
            <Navbar loggedIn={true} logout={logout} isPatient={false}/>
            <Scheduler id={props.match.params.id}></Scheduler>
        </div>
    )
}

export default DoctorHome



