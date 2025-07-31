import mongoose from "mongoose";



const singleSeriesSchema = new mongoose.Schema({
    series:String,
    totalAdmins:Number,
    activeAdmins:Number,

})

const singleSeriesSchemaUser = new mongoose.Schema({
    series:String,
    totalUsers:Number,
    activeUsers:Number,

})

const CrimexisProtocolsSchema = new mongoose.Schema({
    currentAdminSeries:String,
    adminSeries: {
        type:Map,
        of:singleSeriesSchema,
    },
    currentUserSeries:String,
    userSeries: {
        type:Map,
        of:singleSeriesSchemaUser,
    }
    
});


const CrimexisProtcModel = mongoose.model('crimexisprotocols', CrimexisProtocolsSchema);

export default CrimexisProtcModel;
