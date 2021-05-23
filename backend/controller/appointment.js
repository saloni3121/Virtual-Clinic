// import Appointment from '../models/appointment.js';
import Patient from '../models/patient.js';
import Appointment from '../models/appointment.js';
import Doctor from '../models/doctor.js';

function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
    return newDate;   
}

export const createAppointment = (req,res) =>{
    let appointment = req.body
    let date = req.body.date.toString()
    let year = parseInt(date.slice(0,4))
    let month = parseInt(date.slice(5,7))-1
    let day = parseInt(date.slice(8,10))
    
    let startDate = new Date(year,month,day,parseInt(req.body.startDate.slice(0,2)),parseInt(req.body.startDate.slice(-2)))
    startDate = convertUTCDateToLocalDate(startDate)
    let endDate = new Date(startDate.getTime() + 30*60000)

    Patient.findById(req.params.id,(err,foundPatient)=>{
        if(err){
            console.error(err);
        }else if(!foundPatient){
            console.log("Patient not found")
        }
        else{
            let doctorName  = req.body.doctorName;
            Doctor.findOne({fullName: doctorName},(err,foundDoctor)=>{
                if(err){
                    console.error(err);
                    res.status(409).json({message: err})
                }
                else if(!foundDoctor){
                    console.log("No doctor found");
                    res.status(409).json("Doctor not found")
                }else{
                    if(req.body.patientName==='undefined undefined'){
                        appointment = {...appointment,"patientName":`${foundPatient.firstName} ${foundPatient.lastName}`}
                    }
                    appointment = {...appointment, "startDate": startDate,"endDate":endDate}
                    const newAppointment = new Appointment(appointment);
                    try{
                        Appointment.create(newAppointment);
                        foundPatient.appointments.push(newAppointment)
                        foundDoctor.appointments.push(newAppointment);
                        foundPatient.save()
                        foundDoctor.save()
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



export const findAppointment = async( req,res)=>{
    Appointment.findById(req.params.id,(err,foundDoctor)=>{
        if(err){
            console.log(err);
            res.status(409).json({message: err})
        }else{
            res.status(200).json(foundDoctor)
        }
    })
}

