import mongoose from "mongoose";


const hotspotsSchema = new mongoose.Schema({
    crimeType: String,
    hotspots: [ 
        {
            locationName:String,
            coordinates:{lat:String, lng:String}
        } 
    ],

});



const Hotspots = mongoose.model('hotspots', hotspotsSchema);

export default hotspotsSchema;