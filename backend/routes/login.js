import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
// import {login} from '../controller/Login.js'
import bcrypt from 'bcrypt';

const router = express.Router();

router.get("/",(req,res)=>{
    console.log("get login");
    res.status(200).json(req.user);
})


router.post( '/', passport.authenticate([ 'patient-local', 'doctor-local' ], {
        failureRedirect : 'http://localhost:5000/login'
    }),
    async (req, res) => {
        console.log(req.user.id);
        if (req.user.role === 'doctor') {
            console.log(req.user)
            res.status(200).json(req.user)
            // return res.redirect("doctor-home/" + req.user.id);
            // res.redirect('/doctor-home/'+req.user);
        }else {
            console.log(req.user)
            res.status(200).json(req.user)
            // return res.redirect("patient-home/" + req.user.id);
        }
            
    }
);


export default router;