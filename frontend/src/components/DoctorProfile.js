import React,{useState, useEffect} from "react";
import { Button } from "@material-ui/core";
import "./ProfileCard.css";
import axios from 'axios';

function ProfileCard(props) {

  const [doctor, setDoctor] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/doctor-home/${props.match.params.id}`)
        .then(res => {
          // console.log(res.data.appointments)
          // const appointment = res.data.appointments;
          console.log(res.data)
          // console.log(appointment.url)
          setDoctor(res.data)
        })
    }, [])

	return (
		<div className="card-container">
			<header className="ava">
				<img src={doctor.image}alt="asjk"/>
			</header>
			<h1 className="">
				{doctor.fullName}
			</h1>
      <h4 className="normal-text-spec">Specialisation in:  <span className="normal-text-spec2">{doctor.specialisation}</span></h4>
      <Button variant="contained">Book an appointment now</Button>
			<h2 className="normal-text"></h2>
			<div className="social-container">
				<div className="followers">
					<h1 className="bold-text">{doctor.dob} years</h1>
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
	);
}

export default ProfileCard;