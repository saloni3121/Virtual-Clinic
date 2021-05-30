import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

const router = express.Router();


router.get("/logout", function (req, res) {
    req.logout();
    res.status(200).json({message: "Success"})
  });

router.post( '/login', passport.authenticate([ 'patient-local', 'doctor-local' ], {
        failureRedirect : 'http://localhost:5000/login'
    }),
    async (req, res) => {
        if (req.user.role === 'doctor') {
            res.status(200).json(req.user)
        }else {
            res.status(200).json(req.user)
        }
            
    }
);


export default router;