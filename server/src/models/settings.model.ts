import mongoose from "mongoose";




const SettingsSchema = new mongoose.Schema({
    siteTitle: {
        type:String,
        default : "Crimexis Settings"
    },
    maintenanceNode : {
        type:Boolean,
        default:false,
    },
    allowUserRegistration : {
        type:Boolean,
        default: true,
    }
});



const Settings = mongoose.model('settings', SettingsSchema);

export default Settings;