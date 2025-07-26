import mongoose from "mongoose";


const hotspotsSchema = new mongoose.Schema({
    crimeType: String,
    hotspots: [ 
        {
            locationName:String,
            coordinates:{lat:Number, lng:Number}
        } 
    ],

});



const Hotspots = mongoose.model('hotspots', hotspotsSchema);

export default Hotspots;