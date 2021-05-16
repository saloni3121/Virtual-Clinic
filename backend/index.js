import express from "express"
import mongoose from "mongoose"
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import passportLocal from 'passport-local'
import patientRoute from './routes/patientRegister.js';
import doctorRoute from './routes/doctorRegister.js';
import loginRoute from './routes/login.js';
import createAppointmentRoute from './routes/createAppointment.js';
import doctorHomeRoute from './routes/doctorhome.js';
import patientHomeRoute from './routes/patienthome.js';
import Patient from "./models/patient.js";
import Doctor from "./models/doctor.js";
import expressSession from 'express-session';
import bcrypt from 'bcrypt';

var LocalStrategy = passportLocal.Strategy;

const app = express();

app.use(cors());
app.use(express.json({limit:"50mb",extended : true}));
app.use(express.urlencoded({limit:"50mb",extended : true}));


const PORT = process.env.PORT || 5000;
const CONNECTION_URL = "mongodb+srv://admin:shourya1234@cluster0.rhgoj.mongodb.net/Virtual_Clinic?retryWrites=true&w=majority";

app.use(passport.initialize());
app.use(passport.session());

app.use('/patient-register',patientRoute);
app.use('/doctor-register',doctorRoute);
app.use('/login',loginRoute);
app.use('/book-appointment',createAppointmentRoute)
app.use("/doctor-home",doctorHomeRoute)
app.use("/patient-home",patientHomeRoute)

app.use(express({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));


passport.use('patient-local', new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
},
(email,password,done)=>{
  Patient.findOne({email:email}).then((user)=>{
    if (!user){
      return done(null,false,{message: "Email address not registered"})
    }
    bcrypt.compare(password,user.password, (err,isMatch)=>{
      if (isMatch){
        return done(null,user)
      }else{
        return done(null, false, { message: 'Password incorrect' });
      }
    })
  }).catch((err) => done(null, false, { message: err.message }));
}))


passport.use('doctor-local',new LocalStrategy({
  usernameField : "email",
  passwordField : "password"
},
  (email,password,done) =>{
    Doctor.findOne({email:email}).then((user)=> {
      if(!user){
        return done(null,false, {message:"Email address not found"})
      }
      bcrypt.compare(password, user.password, (err,isMatch)=>{
        if (isMatch){
          return done(null,user)
        }else{
          return done(null, false, { message: 'Password incorrect' });
        }
      })
    }).catch((err) => done(null, false, { message: err.message }));
}))

passport.serializeUser((user, done) => {
  done(null, { _id: user.id, role: user.role });
});

passport.deserializeUser((login, done) => {
  if (login.role === 'patient') {
      Patient.findById(login, function(err, patient) {
          if (patient) done(null, patient);
          else done(err, { message: 'Patient not found' });
      });
  }
  else if (login.role === 'doctor') {
      Doctor.findById(login, (err, doctor) => {
          if (doctor) done(null, doctor);
          else done(err, { message: 'Doctor not found' });
      });
  }
  else {
      done({ message: 'No entity found' }, null);
  }
});



app.get("/", (req,res)=>{
    res.send("hello");
})


mongoose.connect(CONNECTION_URL,{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>app.listen(PORT, ()=> console.log(`Connection to mongoDB is established and is now listening on port : ${PORT}`)
)).catch((err)=> console.log(err.message));