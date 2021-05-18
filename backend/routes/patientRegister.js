import express from 'express';
import bodyParser from 'body-parser';
import {getPatient, createPatient} from '../controller/patient.js';


const router = express.Router();

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

// router.get("/patient/:id",urlencodedParser,findPatient)

router.get("/",urlencodedParser, getPatient)
router.post('/',jsonParser,createPatient);


export default router;