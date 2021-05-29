import React,{useState, useEffect} from "react";
import { Button, CircularProgress } from "@material-ui/core";
import "./ProfileCard.css";
import axios from 'axios';

function ProfileCard(props) {

  const [isLoaded, setIsLoaded] = useState(false)
  const [doctor, setDoctor] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/doctor-home/${props.match.params.id}`)
        .then(res => {

		setTimeout(()=>{
          // console.log(res.data.appointments)
          // const appointment = res.data.appointments;
          console.log(res.data)
          // console.log(appointment.url)
          setDoctor(res.data)
          setIsLoaded(true)

		},300)
        })
    }, [props.match.params.id])

	function getAge(dateString) {
		var today = new Date();
		var birthDate = new Date(dateString);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}

	return (
		<>
		{isLoaded?
		<>
		<div className="card-container">
			<header className="ava">
				<img src={doctor.image}alt="asjk"/>
			</header>
			<h1 className="">
				{doctor.fullName}
			</h1>
      <h4 className="normal-text-spec" style={{marginTop: '-15px'}}>Specialisation in:  <span className="normal-text-spec2">
		  {doctor.specialisation}</span>
	  </h4>
      <Button variant="contained" style={{marginTop: '-20px',marginBottom: '20px', backgroundColor: '#22577A', color: '#fff'}}>
		  Book an appointment now
	  </Button>
			{/* <h2 className="normal-text"></h2> */}
			<div className="social-container">
				<div className="followers">
					<h1 className="bold-text">{getAge(doctor.dob)} years</h1>
					<h2 className="smaller-text">Age</h2>
				</div>
				<div className="likes">
					<h1 className="bold-text">{doctor.clinicContact}</h1>
					<h2 className="smaller-text">Clinic Contact</h2>
				</div>
				<div className="photos">
					<h1 className="bold-text">{doctor.fees}</h1>
					<h2 className="smaller-text">Consultation Fees</h2>
				</div>
			</div>
		</div>
		</>:
		<>
		<CircularProgress style={{margin: '350px auto'}}/>
		</>}
		</>
		
	);
}

export default ProfileCard;