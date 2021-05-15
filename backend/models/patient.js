import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dob : Date,
    password: String,
    phoneNumber: String,
    gender : String,
    role: String
});

const patient = mongoose.model('patient',patientSchema);

export default patient;