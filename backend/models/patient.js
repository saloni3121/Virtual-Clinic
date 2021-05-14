import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    // dob : Date,
    email: String,
    password: String,
    phoneNumber: String,
    gender : String,
});

const patient = mongoose.model('patient',patientSchema);

export default patient;