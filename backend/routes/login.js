import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
// import {login} from '../controller/Login.js'
import bcrypt from 'bcrypt';

const router = express.Router();

router.get("/",(req,res)=>{
    console.log("login");
    res.status(200).send("login");
})

router.post( '/', passport.authenticate([ 'patient-local', 'doctor-local' ], {
        failureRedirect : 'http://localhost:5000/login'
    }),
    async (req, res) => {
        console.log(req.user.id);
        if (req.user.role === 'doctor') {
            console.log("doctorrrrrrr")
            return res.redirect("doctor-home/" + req.user.id);
        }else {
            console.log("patientttttttt")
            return res.redirect("patient-home/" + req.user.id);
        }
            
    }
);


export default router;