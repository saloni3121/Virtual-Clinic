import express from 'express';
import bodyParser from 'body-parser';
import {getPatient, createPatient} from '../controller/patient.js';

const router = express.Router();

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

// router.get('/patient-register',urlencodedParser,getPatient);
// router.get('/patient-register',()=> console.log("hiii shouru"));
router.get("/",urlencodedParser, getPatient)
router.post('/',jsonParser,createPatient);

export default router;