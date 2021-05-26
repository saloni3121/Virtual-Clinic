import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema({
    startDate:Date,
    endDate: Date,
    doctorName: String,
    patientName: String,
    meetingLink: String,
    date: Date,
    url: String,
    prescription: Object
})
 
const appointment = mongoose.model('appointment',appointmentSchema);

export default appointment