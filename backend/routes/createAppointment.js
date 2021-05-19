// import Appointment from '../models/appointment.js';
import express from 'express';
import bodyParser from 'body-parser';
import Appointment from '../models/appointment.js'
import {createAppointment} from '../controller/appointment.js';

const router = express.Router();

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

// router.get("/:id",urlencodedParser,(req,res)=>{
//     res.status(200).send("book an appointment form")
// })

router.get('/:id',async (req,res) =>{
    const allAppointments = await Appointment.find()
    try{
        // console.log(typeof(allDoctors))
        // console.log(allDoctors)
        res.status(200).json(allAppointments);
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
})

router.post("/:id",jsonParser,createAppointment)


// router.post("/:patient_id", (req,res)=>{
//     let appointment = req.body
//     Patient.findById(req.params.patient_id,(err,foundPatient)=>{
//         console.log(foundPatient);
//         if(err){
//             console.error(err);
//             res.redirect("/book-appointment" + req.params.patient_id)
//         }else if(!foundPatient){
//             console.log("Patient not found")
//             res.redirect("/book-appointment" + req.params.patient_id)
//         }
//         else{
//             let doctorName  = req.body.doctorName;
//             console.log(doctorName)
//             Doctor.findOne({fullName: doctorName},(err,foundDoctor)=>{
//                 if(err){
//                     console.error(err);
//                     res.redirect("/book-appointment" + req.params.patient_id)
//                 }
//                 else if(!foundDoctor){
//                     console.log("No doctor found")
//                     return res.redirect("/book-appointment" + req.params.patient_id)
//                 }else{
//                     const newAppointment = new Appointment(appointment);
//                     try{
//                         Appointment.create(newAppointment);
//                         foundPatient.appointments.push(newAppointment)
//                         foundDoctor.appointments.push(newAppointment);
//                         console.log(foundDoctor.appointments)
//                         console.log(foundPatient.appointments)
//                         res.status(201).json(newAppointment);
//                     }
//                     catch (error){
//                         console.error(error.message)
//                         res.status(409).json({message: error.message})
//                     }
//                 }
//             })
//         }
//     })
// })


export default router;


