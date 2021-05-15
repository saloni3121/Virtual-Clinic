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

router.post(
    '/',
    passport.authenticate([ 'patient-local', 'doctor-local' ], {
        failureRedirect : 'http://localhost:5000/login'
    }),
    async (req, res) => {
        if (req.user.role === 'doctor') 
            return res.redirect('http://localhost:5000/doctor-home');
        else 
            return res.redirect('http://localhost:5000/patient-home');
    }
);


export default router;