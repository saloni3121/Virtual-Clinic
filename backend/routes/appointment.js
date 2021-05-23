import express from 'express';
import bodyParser from 'body-parser';
import {findAppointment} from '../controller/appointment.js'

const router = express.Router();

const jsonParser = express.json();
const urlencodedParser = express.urlencoded({ extended: true });


router.get('/:id', urlencodedParser ,findAppointment)

export default router;