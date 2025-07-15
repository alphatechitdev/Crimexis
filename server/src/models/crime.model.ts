import mongoose from "mongoose";

const crimesSchema = new mongoose.Schema({
    crimeId: { type: String, required: true },
    crimeType : { type: String, required:true},
    victim: [
        {
            name:String,
            age:Number,
            profession:String
        }
    ],
    crimeLocation: {type:String, required:true},
    coordinates: {
        lat:Number,
        lng:Number,
    },
    crimeTime: {type: String, required:true},
    involvedPeople: [
        {
            name:String,
            age:Number,
            profession:String
        }
    ],
    reportedBy:String,
    severityLevel:String,
});



const Crime = mongoose.model('crimes', crimesSchema);

export default Crime;