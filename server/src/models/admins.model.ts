import mongoose from "mongoose";


const AdminSchema = new mongoose.Schema({
    departmentName:String,
    departmentMainOffice:{
        address: String,
    },
    adminOffice: {
        address:String,
    },
    adminName:String,
    adminEmail:String,
    adminPhone:String,
    adminUserId:String,
    adminPassword:String,
    adminHonestCheck:String,
    accountStatus:Boolean

});

const Admins = mongoose.model('admins', AdminSchema);

export default Admins;




