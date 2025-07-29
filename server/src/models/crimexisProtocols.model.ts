import mongoose from "mongoose";



const singleSeriesSchema = new mongoose.Schema({
    series:String,
    totalAdmins:Number,
    activeAdmins:Number,

})

const CrimexisProtocolsSchema = new mongoose.Schema({
    currentAdminSeries:String,
    adminSeries: {
        type:Map,
        of:singleSeriesSchema,
    }
    
});


const CrimexisProtcModel = mongoose.model('crimexisprotocols', CrimexisProtocolsSchema);

export default CrimexisProtcModel;
