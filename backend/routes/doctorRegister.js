import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import {getDoctor, createDoctor} from '../controller/doctor.js';
// import bcrypt from 'bcrypt';
// import parser from '../middleware/cloudinary.config.js';

//CLOUDINARY REQUIREMENTS
// var storage = multer.diskStorage({
//     filename: function (req, file, callback) {
//       callback(null, Date.now() + file.originalname);
//     },
//   });
// var imageFilter = function (req, file, cb) {
//     // accept image files only
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
//       return cb(new Error("Only image files are allowed!"), false);
//     }
//     cb(null, true);
//   };
// var upload = multer({ storage: storage, fileFilter: imageFilter });

const router = express.Router();

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get('/',urlencodedParser,getDoctor);
router.post('/',jsonParser,createDoctor);

export default router;
