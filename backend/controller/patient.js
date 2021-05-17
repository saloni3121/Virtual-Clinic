import Patient from '../models/patient.js';
import bcrypt from 'bcrypt';
import cloud from 'cloudinary';
import multer from 'multer';



const cloudinary = cloud.v2;
// const jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({ extended: true });

export const getPatient = async (req,res) =>{
    const allPatients = await Patient.find()
    try{
        res.status(200).json(allPatients);
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
}

export const createPatient = async (req,res) =>{
    Patient.findOne({email:req.body.email},(patient,done)=>{
        if(patient){
            // return res.status(409).json({message: "Email already registered"})
            return done(null,false,{message:" Email already registered"})
        }
    })
    const saltRounds =10
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const patient = {...req.body,"password": hash,"role": "patient"};
    const newPatient = new Patient(patient);
    try{
        await Patient.create(newPatient);
        res.status(201).json(newPatient);
    }
    catch(error){
        res.status(409).json({message: error.message})
    }
}
