import Doctor from '../models/doctor.js';
import bcrypt from 'bcrypt';

export const getDoctor = async (req,res) =>{
    const allDoctors = await Doctor.find()
    try{
        res.status(200).json(allDoctors);
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
}

export const createDoctor = async (req,res) =>{
    Doctor.findOne({email:req.body.email},(doc,err,done)=>{
        if(doc){
            return done(null,false,{message: "Email already registered"})
        }
    })
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    const doctor = {...req.body,"password": hash,"role": "doctor"};
    const newDoctor = new Doctor(doctor);
    try{
        await Doctor.create(newDoctor);
        res.status(201).json(newDoctor);
    }
    catch(error){
        res.status(409).json({message: error.message})
    }
}
