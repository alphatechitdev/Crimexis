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
    adminUsername:String,
    adminPassword:String,

});

const Admins = mongoose.model('admins', AdminSchema);

export default Admins;




