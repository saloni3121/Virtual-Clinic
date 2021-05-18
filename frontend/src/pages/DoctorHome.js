import React,{useEffect, useState} from 'react'
import axios from 'axios'

function DoctorHome(props) {

    const[data, setData] = useState('');
    console.log(props)

    useEffect(()=>{
        async function makeRequest() {
            await axios.get("http://localhost:5000/register-doctor").then ((res)=>{
                const response = res.data[0];
                console.log(response);
                setData(response);
            })
        }
        makeRequest();
    },[]);

    return (
        <div>
            <h1>Doctor Home</h1>
            <h2>{data.firstName}</h2>
            <img style={{width: '200px',height: 'auto'}} src={data.image} alt="profile-img" />
        </div>
    )
}

export default DoctorHome
