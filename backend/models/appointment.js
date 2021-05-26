import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema({
    startDate:Date,
    endDate: Date,
    doctorName: String,
    patientName: String,
    meetingLink: String,
    date: Date,
    file: String,
})
 
const appointment = mongoose.model('appointment',appointmentSchema);

export default appointment