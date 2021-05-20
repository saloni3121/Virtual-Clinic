import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import {createDoctor} from '../controller/doctor.js';

const router = express.Router();

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });


router.post('/',jsonParser,createDoctor);

export default router;
