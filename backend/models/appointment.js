import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema({
    startTime:Date,
    endTime: Date,
    doctorName: String,
    patientName: String,
    meetingLink: String,
})
 
const appointment = mongoose.model('doctor',appointmentSchema);

export default appointment