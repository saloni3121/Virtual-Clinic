import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema({
    startTime:Date,
    endTime: Date,
    doctorName: String,
    patientName: String,
    meetingLink: String,
    date: Date,
})
 
const appointment = mongoose.model('appointment',appointmentSchema);

export default appointment