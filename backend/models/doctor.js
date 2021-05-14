import mongoose from 'mongoose'

const doctorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dob : Date,
    clinicContact : String,
    gender : String,
    email: String,
    password: String,

})
 
const doctor = mongoose.model('doctor',doctorSchema);

export default doctor