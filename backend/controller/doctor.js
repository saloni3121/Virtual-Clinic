import doctorData from '../models/doctor.js';

export const getDoctor = async (req,res) =>{
    const allDoctors = await doctorData.find()
    try{
        res.status(200).json(allDoctors);
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
}

export const createDoctor = async (req,res) =>{
    const doctor = req.body;
    const newDoctor = new doctorData(doctor);
    try{
        await doctorData.create(newDoctor);
        res.status(201).json(newDoctor);
    }
    catch(error){
        res.status(409).json({message: error.message})
    }
}