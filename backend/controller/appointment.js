import Appointment from '../models/appointment.js';
import Patient from '../models/patient.js';
import Doctor from '../models/doctor.js';


export const createAppointment = (req,res) =>{
    let appointment = req.body
    Patient.findById(req.params.id,(err,foundPatient)=>{
        console.log(req.params.id);
        if(err){
            console.error(err);
            res.redirect("/book-appointment/" + req.params.id)
        }else if(!foundPatient){
            console.log("Patient not found")
            res.redirect("/book-appointment/" + req.params.id)
        }
        else{
            let doctorName  = req.body.doctorName;
            Doctor.findOne({fullName: doctorName},(err,foundDoctor)=>{
                if(err){
                    console.error(err);
                    res.redirect("/book-appointment/" + req.params.id)
                }
                else if(!foundDoctor){
                    console.log("No doctor found")
                    // res.status(401).location()
                    res.redirect("/book-appointment/" + req.params.id)
                }else{
                    const newAppointment = new Appointment(appointment);
                    try{
                        Appointment.create(newAppointment);
                        foundPatient.appointments.push(newAppointment)
                        foundDoctor.appointments.push(newAppointment);
                        console.log(foundDoctor.appointments)
                        console.log(foundPatient.appointments)
                        res.status(201).json(newAppointment);
                    }
                    catch (error){
                        console.error(error.message)
                        res.status(409).json({message: error.message})
                    }
                }
            })
        }
    })
}

// export default createAppointment;