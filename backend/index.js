import express from "express"
import mongoose from "mongoose"
import cors from 'cors';
import bodyParser from 'body-parser';
import patientRoute from './routes/patientRegister.js';
import doctorRoute from './routes/doctorRegister.js';


const app = express();

app.use(cors());
app.use(bodyParser.json({limit:"50mb",extended : true}));
app.use(bodyParser.urlencoded({limit:"50mb",extended : true}));


const PORT = process.env.PORT || 5000;
const CONNECTION_URL = "mongodb+srv://admin:shourya1234@cluster0.rhgoj.mongodb.net/Virtual_Clinic?retryWrites=true&w=majority";


app.use('/patient-register',patientRoute);
app.use('/doctor-register',doctorRoute);


app.get("/", (req,res)=>{
    res.send("hello");
})

mongoose.connect(CONNECTION_URL,{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>app.listen(PORT, ()=> console.log(`Connection to mongoDB is established and is now listening on port : ${PORT}`)
)).catch((err)=> console.log(err.message));