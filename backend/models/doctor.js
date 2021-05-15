import mongoose from 'mongoose'

const doctorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob : Date,
    clinicContact : String,
    gender : String,
    email: {
        type:String,
        required: true,
        unique:true
    },
    password: String,
    role: String,
    specialisation: String,
})
 
const doctor = mongoose.model('doctor',doctorSchema);

export default doctor