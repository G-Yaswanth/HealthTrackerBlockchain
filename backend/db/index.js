require('dotenv').config({path:'../.env'});

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDB");
})

// Define schemas
const HealthSchema = new mongoose.Schema({
    patientName: String,
    patientAge: Number,
    patientDescription: String,
    patientUID: Number,
    timeStamp: String,
    hash: String,
    previousHash: String,
});


const HealthTrackerDB = mongoose.model('HealthTracker', HealthSchema);

module.exports = {
    HealthTrackerDB
}
