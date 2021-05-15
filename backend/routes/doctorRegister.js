import express from 'express';
import bodyParser from 'body-parser';
import {getDoctor, createDoctor} from '../controller/doctor.js';
import bcrypt from 'bcrypt';

const router = express.Router();

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get('/',urlencodedParser,getDoctor);
router.post('/',jsonParser,createDoctor);

export default router;