import mongoose from "mongoose";




const BruteForceLogSchema = new mongoose.Schema({
    ip: String,
    attemptedUser : String,
    timestamp: String,
});

const BruteForceLog = mongoose.model('BruteForceLog', BruteForceLogSchema);

export default BruteForceLog;