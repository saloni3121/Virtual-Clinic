import express from 'express';
// import bodyParser, { urlencoded } from 'body-parser';
// import Doctot from '../models/doctor.js'
import {findDoctor} from '../controller/doctor.js'
const router = express.Router();

const urlencodedParser = express.urlencoded({ extended: true });

router.get("/:id",urlencodedParser,findDoctor)

export default router;