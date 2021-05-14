import patientData from '../models/patient.js';

export const getPatient = async (req,res) =>{
    const allPatients = await patientData.find()
    try{
        res.status(200).json(allPatients);
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
}

export const createPatient = async (req,res) =>{
    const patient = req.body;
    const newPatient = new patientData(patient);
    try{
        await patientData.create(newPatient);
        res.status(201).json(newPatient);
    }
    catch(error){
        res.status(409).json({message: error.message})
    }
}